"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { getLogs, deleteLog, updateLog, type FoodLog } from "@/lib/storage";

export default function HistoryPage() {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<FoodLog>>({});

  useEffect(() => {
    const syncLogs = () => setLogs(getLogs());
    syncLogs();
    window.addEventListener("fittrack:logs-changed", syncLogs);
    window.addEventListener("storage", syncLogs);
    return () => {
      window.removeEventListener("fittrack:logs-changed", syncLogs);
      window.removeEventListener("storage", syncLogs);
    };
  }, []);

  const handleDelete = (id: string) => {
    setLogs((current) => current.filter((log) => log.id !== id));
    deleteLog(id);
  };

  const startEditing = (log: FoodLog) => {
    setEditing(log.id);
    setDraft({ name: log.name, calories: log.calories, protein: log.protein, carbs: log.carbs, fat: log.fat, quantity: log.quantity, meal: log.meal });
  };

  const handleUpdate = () => {
    if (!editing || !draft.name?.trim()) return;
    updateLog(editing, {
      name: draft.name.trim(),
      calories: Number(draft.calories) || 0,
      protein: Number(draft.protein) || 0,
      carbs: Number(draft.carbs) || 0,
      fat: Number(draft.fat) || 0,
      quantity: Number(draft.quantity) || 0,
      meal: draft.meal as FoodLog["meal"],
    });
    setLogs(getLogs());
    setEditing(null);
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
                    <div key={log.id} className="rounded-xl bg-surface border border-border px-4 py-3">
                      {editing === log.id ? (
                        <div className="flex flex-col gap-3">
                          <input aria-label="Food name" value={draft.name || ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent" />
                          <div className="grid grid-cols-2 gap-2">
                            {([['calories', 'Calories'], ['protein', 'Protein'], ['carbs', 'Carbs'], ['fat', 'Fat'], ['quantity', 'Quantity (g)']] as const).map(([key, label]) => (
                              <label key={key} className="text-[11px] text-text-muted">{label}<input type="number" value={draft[key] ?? ""} onChange={(e) => setDraft({ ...draft, [key]: Number(e.target.value) })} className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-2 py-1.5 text-sm text-text-primary outline-none focus:border-accent" /></label>
                            ))}
                            <label className="text-[11px] text-text-muted">Meal<select value={draft.meal} onChange={(e) => setDraft({ ...draft, meal: e.target.value as FoodLog["meal"] })} className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-2 py-1.5 text-sm text-text-primary outline-none"><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></select></label>
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" aria-label="Cancel edit" onClick={() => setEditing(null)} className="interactive-control rounded-lg p-2 text-text-muted"><X /></button><button type="button" aria-label="Save edit" onClick={handleUpdate} className="interactive-control rounded-lg bg-accent p-2 text-ink"><Check /></button></div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{log.name}</p><p className="text-xs text-text-muted">{log.meal} · {log.quantity}g · P{Math.round(log.protein)} C{Math.round(log.carbs)} F{Math.round(log.fat)}</p></div>
                          <div className="flex items-center gap-2"><span className="text-sm font-medium">{Math.round(log.calories)}</span><button type="button" aria-label={`Edit ${log.name}`} onClick={() => startEditing(log)} className="interactive-control rounded-lg p-2 text-text-secondary hover:text-accent"><Pencil /></button><button type="button" aria-label={`Delete ${log.name}`} onClick={() => handleDelete(log.id)} className="interactive-control rounded-lg p-2 text-red-400 hover:text-red-300"><Trash2 /></button></div>
                        </div>
                      )}
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
