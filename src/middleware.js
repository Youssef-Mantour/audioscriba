// middleware.js or middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to login if not authenticated
  },
});

// Protect only /audio and its subpages
export const config = {
  matcher: ["/audio/:path*"], // Match /audio and all its subpages (e.g., /audio/play, /audio/edit)
};
