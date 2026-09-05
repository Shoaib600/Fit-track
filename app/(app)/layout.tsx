"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("fittrack_user");
    const hasCompletedOnboarding = localStorage.getItem("fittrack_onboarding_complete") === "true";

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!hasCompletedOnboarding) {
      router.replace("/onboarding");
    }
  }, [router]);

  return (
    <div className="min-h-dvh pb-24">
      {children}
      <BottomNav />
    </div>
  );
}
