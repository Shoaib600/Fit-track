"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGoals, saveGoals } from "@/lib/storage";

export default function SettingsPage() {
  const router = useRouter();
  const [goals, setGoalsState] = useState({ calories: 2200, protein: 150, carbs: 220, fat: 70 });
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setGoalsState(getGoals());
    const user = JSON.parse(localStorage.getItem("fittrack_user") || "{}");
    setEmail(user.email || "");
  }, []);

  const handleSave = () => {
    saveGoals(goals);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("fittrack_user");
    router.replace("/login");
  };

  return (
    <div className="px-5 pt-8 pb-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-6">Settings</h1>

      <div className="rounded-xl bg-surface border border-border p-4 mb-4">
        <p className="text-xs text-text-muted mb-1">Logged in as</p>
        <p className="text-sm font-medium">{email}</p>
      </div>

      <div className="rounded-xl bg-surface border border-border p-4 space-y-4 mb-6">
        <p className="text-sm font-medium">Daily Goals</p>
        {[
          { key: "calories", label: "Calories (kcal)" },
          { key: "protein", label: "Protein (g)" },
          { key: "carbs", label: "Carbs (g)" },
          { key: "fat", label: "Fat (g)" },
        ].map((g) => (
          <div key={g.key}>
            <label className="text-xs text-text-secondary">{g.label}</label>
            <input
              type="number"
              value={(goals as any)[g.key]}
              onChange={(e) =>
                setGoalsState({ ...goals, [g.key]: parseInt(e.target.value) || 0 })
              }
              className="w-full mt-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className="w-full rounded-xl bg-accent py-3 font-semibold text-ink active:scale-[0.98] transition"
        >
          {saved ? "Saved ✓" : "Save Goals"}
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="w-full rounded-xl border border-border py-3 text-sm text-red-400 active:scale-[0.98] transition"
      >
        Log out
      </button>

      <p className="mt-10 text-center text-xs text-text-muted">Developed by Muhammad Shoaib</p>
    </div>
  );
}
