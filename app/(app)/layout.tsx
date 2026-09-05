"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("fittrack_user")) {
      router.replace("/login");
      return;
    }

    // Warm the client route bundles so tab changes do not wait on a cold request.
    ["/home", "/history", "/scan", "/settings"].forEach((path) => router.prefetch(path));
  }, [router]);

  return (
    <div className="min-h-dvh pb-24">
      {children}
      <BottomNav />
    </div>
  );
}
