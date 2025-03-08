import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Specify the pages that need authentication
  pages: {
    signIn: "/login",  // Redirect to login if not authenticated
  },
  // Matcher: List the routes that should be protected by authentication
  matcher: ["/audio/*"],  // Example of protected routes
});

