import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
   pages: {
    signIn: "/auth/custom-login",  // path to your custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
    theme: {
  colorScheme: "dark",  // "light" | "dark" | "auto"
  brandColor: "#11f057", // Primary brand color (hex, rgb, rgba, etc.)
  // logo: "https://example.com/logo.png", // URL of your logo image
  buttonText: "#ffffff", // Text color on buttons
  buttonBackground: "rgb(205, 32, 32)", // Background color of buttons
  buttonHoverBackground: "#0ed34a", // Button hover background color
  buttonBorder: "#0bd046", // Button border color
  buttonHoverBorder: "#09b63f", // Button border color on hover
}
,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Add user ID to session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
