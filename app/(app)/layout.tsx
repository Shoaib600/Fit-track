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

    // Do not prefetch every screen on mount. It competes with hydration and
    // makes the first tap feel delayed on slower mobile connections.
  }, [router]);

  return (
    <div className="min-h-dvh pb-24">
      {children}
      <BottomNav />
    </div>
  );
}
