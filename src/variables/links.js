const isProduction = process.env.NODE_ENV === "production"

export const api = isProduction ? "https://api.yeecord.com" : "http://localhost:8080"

export const oauth2 = `${api}/login`

export const support = "https://discord.gg/yeecord"

export const homepage = "https://yeecord.com/"

export const invite = "https://yeecord.com/link"

export const credit = "https://yeecord.com/docs/credit/"

export const github = "https://github.com/yeecord"
