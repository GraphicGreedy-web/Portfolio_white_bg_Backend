const getCmsToken = () => process.env.CMS_TOKEN || "dev-cms-token"

export const requireCmsAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : ""

    if (token !== getCmsToken()) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    next()
}

export const getPublicCmsToken = () => getCmsToken()
