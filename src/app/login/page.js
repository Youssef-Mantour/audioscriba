"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Authentication</h1>
      {!session ? (
        <button
          onClick={() => signIn()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign In with Google/GitHub
        </button>
      ) : (
        <>
          <p>Welcome, {session.user.name}!</p>
          <p>Email: {session.user.email}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => router.push("/audio")}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Go to Audio
            </button>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
