"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { saveGoals } from "@/lib/storage";

export default function OnboardingPage() {
  const router = useRouter();
  const [goals, setGoals] = useState({ calories: "2200", protein: "150", carbs: "220", fat: "70" });

  const handleContinue = () => {
    saveGoals({
      calories: Number(goals.calories) || 2200,
      protein: Number(goals.protein) || 150,
      carbs: Number(goals.carbs) || 220,
      fat: Number(goals.fat) || 70,
    });
    localStorage.setItem("fittrack_onboarding_complete", "true");
    router.replace("/home");
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-6 py-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-accent-soft">
          <Image src="/fittrack-logo-small.png" alt="FitTrack logo" width={56} height={56} priority sizes="56px" className="size-14 object-cover" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Set your daily targets</h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">You can change these anytime in Settings.</p>
      </div>

      <div className="flex flex-col gap-4">
        {[
          ["calories", "Calories (kcal)"],
          ["protein", "Protein (g)"],
          ["carbs", "Carbs (g)"],
          ["fat", "Fat (g)"],
        ].map(([key, label]) => (
          <label key={key} className="text-xs font-medium text-text-secondary">
            {label}
            <input
              type="number"
              min="0"
              value={goals[key as keyof typeof goals]}
              onChange={(event) => setGoals({ ...goals, [key]: event.target.value })}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent"
            />
          </label>
        ))}
        <button type="button" onClick={handleContinue} className="interactive-control mt-2 w-full rounded-xl bg-accent py-3.5 font-semibold text-ink">
          Continue to FitTrack
        </button>
      </div>
    </main>
  );
}
