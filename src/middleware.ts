import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'

export const config = {
  matcher: ['/signin/:path*', '/blogs/create:path*']
}

export default withAuth(
  async function middleware(req) {
    const response = NextResponse
    const token = await getToken({ req })
    const isAuthenticated = token
    const authPage = req.nextUrl.pathname.startsWith('/signin')

    if (authPage) {
      if (isAuthenticated) {
        return response.redirect(new URL('/', req.url))
      }

      return null
    }

    if (!isAuthenticated) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.url.search
      }

      return response.redirect(
        new URL(`/signin?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      }
    }
  }
)
