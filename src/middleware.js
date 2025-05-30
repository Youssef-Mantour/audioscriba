// middleware.js or middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/custom-login", // Redirect to login if not authenticated
  },
});

// Protect only /audio and its subpages
export const config = {
  matcher: ["/audio-hindi","/audio-italian","/audio-japaese","/audio-portuguese","/audio-spanish","/audio-british","/audio-chinese","/audio-american"], // Match /audio and all its subpages (e.g., /audio/play, /audio/edit)
};
