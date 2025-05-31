import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/webhook",
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    "/api/webhook",
  ],
  // Handle token expiration more gracefully
  afterAuth(auth, req, evt) {
    // If the token is expired, redirect to sign-in
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
  },
})

// Stop Middleware running on static files
export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension
    "/((?!.*\\.).*)",
    // Optional: Allow access to static files
    "/(api|trpc)(.*)",
  ],
} 