"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // FitTrack does not cache app requests. Unregister legacy workers without
    // scanning or deleting caches during startup, which can delay first taps.
    void navigator.serviceWorker.getRegistrations().then((registrations) => {
      void Promise.all(registrations.map((registration) => registration.unregister()));
    }).catch(() => undefined);
  }, []);

  return null;
}
