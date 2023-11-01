export const checkEnv = () => {
  let isProd = false
  let host = 'http://localhost:3000'

  if (process.env.NETLIFY) {
    isProd = true
    host = process.env.NEXT_PUBLIC_URL as string
  } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    isProd = false
    host = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  } else {
    isProd = false
    host = 'http://localhost:3000'
  }

  return {
    production: isProd,
    host
  }
}
