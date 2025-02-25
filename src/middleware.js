import { withAuth } from "next-auth/middleware";

export default function middleware(req) {
  console.log("Middleware triggered for:", req.nextUrl.pathname); // Debugging
  return withAuth({
    pages: {
      signIn: "/login",
    },
  })(req);
}

export const config = { matcher: ["/", "/audio/:path*"] };
