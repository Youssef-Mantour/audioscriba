"use client";
 
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect authenticated users to /audio
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/audio");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Login</h1>
      {!session ? (
        <h2> To use again your app please login </h2>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}
