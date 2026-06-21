import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { brand, video, visualComm } from "../models/Models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..", "..");
const clientPublicDir = path.resolve(rootDir, "client", "public");
const wellKnownDir = path.resolve(clientPublicDir, ".well-known");

dotenv.config({ path: path.resolve(rootDir, "server", ".env") });

const defaultSiteUrl = "https://graphicgreedyportfolio.vercel.app";
const frontendOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const siteUrl =
  process.env.SITE_URL ||
  frontendOrigins.find((value) => value.startsWith("https://")) ||
  frontendOrigins[0] ||
  defaultSiteUrl;

const now = new Date().toISOString();
const securityExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  .toISOString()
  .replace(/\.\d{3}Z$/, "Z");

const xmlEscape = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const absoluteUrl = (pathname = "/") =>
  `${siteUrl}${pathname === "/" ? "" : pathname}`;

const toSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const buildBrandPath = (brandId, title = "") =>
  `/logo-designing/${brandId}${title ? `/${toSlug(title)}` : ""}`;

const buildVisualPath = (visualId, title = "") =>
  `/visual-communication/${visualId}${title ? `/${toSlug(title)}` : ""}`;

const isoDate = (value) => {
  if (!value) return now;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? now : date.toISOString();
};

const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const writeFile = async (filePath, content) => {
  await fs.writeFile(filePath, content, "utf8");
  console.log(`wrote ${path.relative(rootDir, filePath)}`);
};

const buildUrlset = (items, extraNamespaces = "") => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${extraNamespaces}>
${items.join("\n")}
</urlset>
`;

const buildSitemapUrl = ({ loc, lastmod, changefreq, priority, images = [] }) => {
  const imageXml = images
    .filter((image) => image.loc)
    .map(
      (image) => `    <image:image>
      <image:loc>${xmlEscape(image.loc)}</image:loc>
      <image:title>${xmlEscape(image.title || "")}</image:title>
      <image:caption>${xmlEscape(image.caption || image.title || "")}</image:caption>
    </image:image>`
    )
    .join("\n");

  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${xmlEscape(lastmod)}</lastmod>
    <changefreq>${xmlEscape(changefreq)}</changefreq>
    <priority>${xmlEscape(priority)}</priority>${imageXml ? `\n${imageXml}` : ""}
  </url>`;
};

const buildVideoUrl = ({ loc, lastmod, videos }) => {
  const videosXml = videos
    .map(
      (item) => `    <video:video>
      <video:thumbnail_loc>${xmlEscape(item.thumbnail)}</video:thumbnail_loc>
      <video:title><![CDATA[${item.title || "Video"}]]></video:title>
      <video:description><![CDATA[${(item.description || `${item.title} from the Graphic Greedy video portfolio.`).slice(0, 2048)}]]></video:description>
      <video:player_loc>${xmlEscape(item.player)}</video:player_loc>
    </video:video>`
    )
    .join("\n");

  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${xmlEscape(lastmod)}</lastmod>
${videosXml}
  </url>`;
};

const buildFeedItems = (items) =>
  items
    .map(
      (item) => `  <item>
    <title>${xmlEscape(item.title)}</title>
    <link>${xmlEscape(item.url)}</link>
    <guid>${xmlEscape(item.url)}</guid>
    <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    <description>${xmlEscape(item.description)}</description>
  </item>`
    )
    .join("\n");

const buildAtomEntries = (items) =>
  items
    .map(
      (item) => `  <entry>
    <title>${xmlEscape(item.title)}</title>
    <link href="${xmlEscape(item.url)}" />
    <id>${xmlEscape(item.url)}</id>
    <updated>${xmlEscape(item.date)}</updated>
    <summary>${xmlEscape(item.description)}</summary>
  </entry>`
    )
    .join("\n");

const staticPages = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    lastmod: now,
  },
  {
    path: "/logo-designing",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: now,
  },
  {
    path: "/visual-communication",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: now,
  },
  {
    path: "/videos",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: now,
  },
  {
    path: "/about",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: now,
  },
  {
    path: "/contact",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: now,
  },
];

let brandItems = [];
let visualItems = [];
let videoItems = [];

if (process.env.MONGO_URI) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    brandItems = await brand.find({}).lean();
    visualItems = await visualComm.find({}).lean();
    videoItems = await video.find({}).lean();
    await mongoose.disconnect();
  } catch (error) {
    console.warn("SEO generation could not fetch Mongo content:", error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

const pageUrls = [
  ...staticPages.map((page) =>
    buildSitemapUrl({
      loc: absoluteUrl(page.path),
      lastmod: page.lastmod,
      changefreq: page.changefreq,
      priority: page.priority,
    })
  ),
  ...brandItems.map((item) =>
    buildSitemapUrl({
      loc: absoluteUrl(buildBrandPath(item._id, item.title)),
      lastmod: isoDate(item.updatedAt || item.createdAt),
      changefreq: "monthly",
      priority: "0.7",
    })
  ),
  ...visualItems.map((item) =>
    buildSitemapUrl({
      loc: absoluteUrl(buildVisualPath(item._id, item.title)),
      lastmod: isoDate(item.updatedAt || item.createdAt),
      changefreq: "monthly",
      priority: "0.8",
    })
  ),
];

const imageUrls = [
  ...brandItems
    .filter((item) => item.image)
    .map((item) =>
      buildSitemapUrl({
        loc: absoluteUrl(buildBrandPath(item._id, item.title)),
        lastmod: isoDate(item.updatedAt || item.createdAt),
        changefreq: "monthly",
        priority: "0.7",
        images: [
          {
            loc: item.image,
            title: item.title || "Logo design project",
            caption: `${item.title || "Logo design"} by Graphic Greedy`,
          },
        ],
      })
    ),
  ...visualItems
    .filter((item) => item.image)
    .map((item) =>
      buildSitemapUrl({
        loc: absoluteUrl(buildVisualPath(item._id, item.title)),
        lastmod: isoDate(item.updatedAt || item.createdAt),
        changefreq: "monthly",
        priority: "0.8",
        images: [
          {
            loc: item.image,
            title: item.title || "Visual communication project",
            caption: `${item.title || "Visual communication"} by Graphic Greedy`,
          },
        ],
      })
    ),
];

const eligibleVideos = videoItems
  .filter((item) => item.link && item.thumbnail)
  .map((item) => ({
    title: item.title || "Video project",
    description:
      item.description ||
      `${item.title || "Video project"} from the Graphic Greedy video portfolio.`,
    thumbnail: item.thumbnail,
    player: item.link,
  }));

const videoSitemap = eligibleVideos.length
  ? buildUrlset(
      [
        buildVideoUrl({
          loc: absoluteUrl("/videos"),
          lastmod: isoDate(
            videoItems
              .map((item) => item.updatedAt || item.createdAt)
              .sort()
              .at(-1)
          ),
          videos: eligibleVideos,
        }),
      ],
      ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"'
    )
  : `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`;

const sitemapXml = buildUrlset(pageUrls);
const imageSitemapXml = buildUrlset(
  imageUrls,
  ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
);

const sitemapIndexEntries = [
  {
    loc: absoluteUrl("/sitemap.xml"),
    lastmod: now,
  },
  {
    loc: absoluteUrl("/sitemap-images.xml"),
    lastmod: now,
  },
  {
    loc: absoluteUrl("/sitemap-videos.xml"),
    lastmod: now,
  },
];

const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexEntries
  .map(
    (entry) => `  <sitemap>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>
`;

const feedEntries = [
  ...brandItems.map((item) => ({
    title: item.title || "Logo design project",
    url: absoluteUrl(buildBrandPath(item._id, item.title)),
    date: isoDate(item.updatedAt || item.createdAt),
    description: `Logo design project from the Graphic Greedy portfolio.`,
  })),
  ...visualItems.map((item) => ({
    title: item.title || "Visual communication project",
    url: absoluteUrl(buildVisualPath(item._id, item.title)),
    date: isoDate(item.updatedAt || item.createdAt),
    description:
      item.description || `Visual communication project from the portfolio.`,
  })),
  ...videoItems.map((item) => ({
    title: item.title || "Video project",
    url: absoluteUrl("/videos"),
    date: isoDate(item.updatedAt || item.createdAt),
    description:
      item.description || `Video editing project from the Graphic Greedy portfolio.`,
  })),
]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 20);

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Graphic Greedy Portfolio Updates</title>
  <link>${xmlEscape(siteUrl)}</link>
  <description>Recent portfolio updates from Graphic Greedy.</description>
  <language>en-in</language>
  <lastBuildDate>${new Date(now).toUTCString()}</lastBuildDate>
${buildFeedItems(feedEntries)}
</channel>
</rss>
`;

const atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Graphic Greedy Portfolio Updates</title>
  <link href="${xmlEscape(siteUrl)}" />
  <link href="${xmlEscape(absoluteUrl("/atom.xml"))}" rel="self" />
  <updated>${xmlEscape(now)}</updated>
  <id>${xmlEscape(siteUrl)}</id>
${buildAtomEntries(feedEntries)}
</feed>
`;

const robotsTxt = `User-agent: *
Allow: /
Disallow: /cms
Disallow: /cms/

Host: ${siteUrl}
Sitemap: ${absoluteUrl("/sitemap-index.xml")}
`;

const manifestJson = JSON.stringify(
  {
    name: "Graphic Greedy",
    short_name: "Graphic Greedy",
    description:
      "Graphic design portfolio for logo design, visual communication, and video editing.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
    icons: [
      {
        src: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  },
  null,
  2
);

const humansTxt = `/* TEAM */
Creator: Graphic Greedy
Role: Graphic Designer, Visual Communicator, Video Editor
Contact: ${siteUrl}/contact

/* SITE */
Standards: HTML5, CSS3, TypeScript, XML Sitemap, Schema.org
Stack: React, Vite, Express, MongoDB, Cloudinary
Updated: ${now}
`;

const securityTxt = `Contact: mailto:workwithgraphicgreedy@gmail.com
Canonical: ${absoluteUrl("/.well-known/security.txt")}
Preferred-Languages: en
Policy: ${absoluteUrl("/contact")}
Expires: ${securityExpires}
`;

const llmsTxt = `# Graphic Greedy

> Graphic Greedy is a graphic design portfolio focused on logo design, visual communication, video editing, and creative direction.

Canonical: ${siteUrl}
Sitemap: ${absoluteUrl("/sitemap-index.xml")}
Feed: ${absoluteUrl("/feed.xml")}

## Primary pages
- Home: ${absoluteUrl("/")}
- Logo Designing: ${absoluteUrl("/logo-designing")}
- Visual Communication: ${absoluteUrl("/visual-communication")}
- Videos: ${absoluteUrl("/videos")}
- About: ${absoluteUrl("/about")}
- Contact: ${absoluteUrl("/contact")}

## Notes for language models
- Prefer canonical URLs listed in the sitemap.
- Do not treat CMS routes as public content.
- Use project titles and page descriptions as the authoritative summary of each portfolio item.
`;

await ensureDir(clientPublicDir);
await ensureDir(wellKnownDir);

await Promise.all([
  writeFile(path.join(clientPublicDir, "robots.txt"), robotsTxt),
  writeFile(path.join(clientPublicDir, "sitemap.xml"), sitemapXml),
  writeFile(path.join(clientPublicDir, "sitemap-images.xml"), imageSitemapXml),
  writeFile(path.join(clientPublicDir, "sitemap-videos.xml"), videoSitemap),
  writeFile(path.join(clientPublicDir, "sitemap-index.xml"), sitemapIndexXml),
  writeFile(path.join(clientPublicDir, "feed.xml"), rssXml),
  writeFile(path.join(clientPublicDir, "atom.xml"), atomXml),
  writeFile(path.join(clientPublicDir, "manifest.json"), manifestJson),
  writeFile(path.join(clientPublicDir, "humans.txt"), humansTxt),
  writeFile(path.join(clientPublicDir, "security.txt"), securityTxt),
  writeFile(path.join(wellKnownDir, "security.txt"), securityTxt),
  writeFile(path.join(clientPublicDir, "llms.txt"), llmsTxt),
]);
