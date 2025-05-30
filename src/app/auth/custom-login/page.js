"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CustomOAuthLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/audio-american"); // redirect if logged in
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    // Optional: show redirect message while pushing user away
    return <p>Redirecting...</p>;
  }

  // Show login UI only if NOT logged in
  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Sign In</h1>
      <button
        style={{ display: "block", marginBottom: 10 }}
        onClick={() => signIn("google", { callbackUrl: "/audio-american" })}
      >
        Sign in with Google
      </button>
      <button
        style={{ display: "block" }}
        onClick={() => signIn("github", { callbackUrl: "/audio-american" })}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
