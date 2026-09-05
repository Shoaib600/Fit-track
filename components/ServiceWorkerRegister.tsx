"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // The app stores logs locally and does not need a worker to intercept requests.
    // Remove old workers and caches so stale deployments cannot delay interactions.
    void navigator.serviceWorker.getRegistrations().then(async (registrations) => {
      await Promise.all(registrations.map((registration) => registration.unregister()));
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.filter((key) => key.startsWith("fittrack-")).map((key) => caches.delete(key)));
      }
    }).catch(() => undefined);
  }, []);

  return null;
}
