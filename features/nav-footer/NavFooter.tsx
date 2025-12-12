"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function NavFooter() {
  return (
    <div className="p-4 w-full flex justify-start">
      <button onClick={() => signOut({ callbackUrl: "/" })}>
        <LogOut className="w-5 h-5 text-blue-700" />
      </button>
    </div>
  );
}
