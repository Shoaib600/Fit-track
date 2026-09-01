"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTodayTotals, getGoals, getLogs, getToday } from "@/lib/storage";

export default function HomePage() {
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0, count: 0 });
  const [goals, setGoals] = useState({ calories: 2200, protein: 150, carbs: 220, fat: 70 });
  const [recent, setRecent] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("fittrack_user") || "{}");
    setName(user.name || "there");
    setTotals(getTodayTotals());
    setGoals(getGoals());
    const todayLogs = getLogs().filter((l) => l.date === getToday()).slice(0, 5);
    setRecent(todayLogs);
  }, []);

  const pct = (val: number, goal: number) => Math.min(100, Math.round((val / goal) * 100));

  return (
    <div className="px-5 pt-8 pb-6 max-w-lg mx-auto">
      <div className="mb-6">
        <p className="text-sm text-text-secondary">Good day,</p>
        <h1 className="text-2xl font-semibold tracking-tight capitalize">{name} 👋</h1>
      </div>

      <div className="rounded-2xl bg-surface border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-secondary">Today&apos;s Calories</span>
          <span className="text-xs text-text-muted">{pct(totals.calories, goals.calories)}%</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold tracking-tight">{Math.round(totals.calories)}</span>
          <span className="text-text-muted mb-1">/ {goals.calories} kcal</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-surface-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${pct(totals.calories, goals.calories)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Protein", val: totals.protein, goal: goals.protein, unit: "g", color: "bg-blue-500" },
          { label: "Carbs", val: totals.carbs, goal: goals.carbs, unit: "g", color: "bg-amber-500" },
          { label: "Fat", val: totals.fat, goal: goals.fat, unit: "g", color: "bg-rose-500" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl bg-surface border border-border p-3">
            <p className="text-[11px] text-text-muted mb-1">{m.label}</p>
            <p className="text-lg font-semibold">{Math.round(m.val)}{m.unit}</p>
            <div className="mt-2 h-1 rounded-full bg-surface-2 overflow-hidden">
              <div className={`h-full rounded-full ${m.color}`} style={{ width: `${pct(m.val, m.goal)}%` }} />
            </div>
            <p className="text-[10px] text-text-muted mt-1">of {m.goal}g</p>
          </div>
        ))}
      </div>

      <Link
        href="/scan"
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent py-3.5 font-semibold text-ink active:scale-[0.98] transition mb-6"
      >
        + Log Food
      </Link>

      <div>
        <h2 className="text-sm font-medium text-text-secondary mb-3">Today&apos;s logs</h2>
        {recent.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-8">No food logged yet. Tap the camera button!</p>
        ) : (
          <div className="space-y-2">
            {recent.map((log) => (
              <div key={log.id} className="flex items-center justify-between rounded-xl bg-surface border border-border px-4 py-3">
                <div>
                  <p className="font-medium text-sm">{log.name}</p>
                  <p className="text-xs text-text-muted">{log.meal} · {log.quantity}g</p>
                </div>
                <p className="text-sm font-medium text-accent">{Math.round(log.calories)} kcal</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
