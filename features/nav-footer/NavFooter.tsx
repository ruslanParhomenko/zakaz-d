"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function NavFooter() {
  return (
    <div className="px-6 pb-8 w-full flex justify-start">
      <button onClick={() => signOut({ callbackUrl: "/" })}>
        <LogOut className="w-6 h-6 text-blue-700 font-bold" />
      </button>
    </div>
  );
}
