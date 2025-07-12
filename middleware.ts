import { withAuth } from "next-auth/middleware"

export default withAuth(
  // middleware function
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/browse/:path*',
    '/items/:path*',
    '/swaps/:path*',
    '/profile/:path*'
  ]
}
