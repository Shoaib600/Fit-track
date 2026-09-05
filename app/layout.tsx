import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "FitTrack",
  description: "Daily calorie and macro tracking",
  applicationName: "FitTrack",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/fittrack-logo-small.png", type: "image/png", sizes: "192x192" },
      { url: "/fittrack-logo.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/fittrack-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-background text-text-primary antialiased">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
