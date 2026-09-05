"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, Camera, Settings } from "lucide-react";
import { clsx } from "clsx";

const tabs = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/history", label: "History", icon: History },
  { href: "/scan", label: "Scan", icon: Camera, primary: true },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md safe-area-pb">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 pb-2 pt-2">
        {tabs.map((tab) => {
          const active = pathname === tab.href || (tab.href === "/home" && pathname === "/");
          const Icon = tab.icon;

          if (tab.primary) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="interactive-control relative -mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-lg shadow-accent/30"
              >
                <Icon className="h-6 w-6" strokeWidth={2.5} />
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "interactive-control flex flex-col items-center gap-0.5 rounded-lg px-3 py-1 text-[11px]",
                active ? "text-accent" : "text-text-muted"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
