"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@mui/material/Button";

export default function LogoutButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    console.log("Signing out..."); // Debugging Log
    await signOut({ redirect: false }); // Prevent default redirect
    router.push("/"); // Manually redirect to home
  };

  useEffect(() => {
    console.log("Session status:", status, "Session:", session); // Debugging Log
    /* if (!session && status !== "loading") {
      router.replace("/");
    } */
  }, [session, status, router]);

  if (status === "loading") return null;

  return (
    <>
      {!session ? (
        <Button  sx={{ color:'black',
          fontSize: "1.5rem" , textTransform: "capitalize",fontFamily:"Georgia, Serif",
          }}
          onClick={() => router.push("/auth/custom-login")}
         
        >
          Sign In
        </Button>
      ) : (
        <Button   sx={ {color:'red',
          fontSize: "1.5rem" , textTransform: "capitalize",fontFamily:"Georgia, Serif",
          }}
          onClick={handleSignOut}
          
        >
          Sign Out
        </Button>
      )}
    </>
  );
}
