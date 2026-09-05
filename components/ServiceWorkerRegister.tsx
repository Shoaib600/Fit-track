"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Remove stale workers once without clearing storage or blocking app interactions.
    if (sessionStorage.getItem("fittrack_sw_cleaned")) return;
    sessionStorage.setItem("fittrack_sw_cleaned", "1");
    void navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => void registration.unregister());
    }).catch(() => undefined);
  }, []);

  return null;
}
