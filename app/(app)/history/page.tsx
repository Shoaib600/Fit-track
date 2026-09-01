"use client";

import { useEffect, useState } from "react";
import { getLogs, deleteLog, type FoodLog } from "@/lib/storage";

export default function HistoryPage() {
  const [logs, setLogs] = useState<FoodLog[]>([]);

  useEffect(() => {
    setLogs(getLogs());
  }, []);

  const handleDelete = (id: string) => {
    deleteLog(id);
    setLogs(getLogs());
  };

  // Group by date
  const grouped = logs.reduce((acc, log) => {
    if (!acc[log.date]) acc[log.date] = [];
    acc[log.date].push(log);
    return acc;
  }, {} as Record<string, FoodLog[]>);

  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="px-5 pt-8 pb-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-6">History</h1>

      {dates.length === 0 ? (
        <p className="text-center text-text-muted py-16">No logs yet</p>
      ) : (
        <div className="space-y-6">
          {dates.map((date) => {
            const dayLogs = grouped[date];
            const dayCals = dayLogs.reduce((s, l) => s + l.calories, 0);
            return (
              <div key={date}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-medium text-text-secondary">
                    {new Date(date + "T12:00:00").toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </h2>
                  <span className="text-xs text-accent font-medium">{Math.round(dayCals)} kcal</span>
                </div>
                <div className="space-y-2">
                  {dayLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between rounded-xl bg-surface border border-border px-4 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{log.name}</p>
                        <p className="text-xs text-text-muted">
                          {log.meal} · {log.quantity}g · P{Math.round(log.protein)} C{Math.round(log.carbs)} F{Math.round(log.fat)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{Math.round(log.calories)}</span>
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
