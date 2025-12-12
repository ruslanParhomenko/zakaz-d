"use client";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <button
        className="bg-background px-4 py-2 rounded shadow hover:bg-blue-300 transition-colors cursor-pointer  font-bold min-w-3xs"
        onClick={() => {
          signIn("google", {
            callbackUrl: "/home",
          });
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
