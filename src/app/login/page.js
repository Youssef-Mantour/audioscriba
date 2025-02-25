"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Authentication</h1>
      {session ? (
        <>
          <p>Welcome, {session.user.name}!</p>
          <p>Email: {session.user.email}</p>
          <button onClick={() => signOut()} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
            Sign Out
          </button>
        </>
      ) : (
        <button onClick={() => signIn()} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Sign In with Google/GitHub
        </button>
      )}
    </div>
  );
}
