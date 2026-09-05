"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("fittrack_user");
    if (user) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-dvh flex items-center justify-center" aria-label="Opening FitTrack">
      <p className="text-sm text-text-muted">Opening FitTrack…</p>
    </div>
  );
}
