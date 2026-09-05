import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FitTrack",
    short_name: "FitTrack",
    description: "Daily calorie and macro tracking",
    start_url: "/home",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [
      { src: "/fittrack-logo.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/fittrack-logo.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
