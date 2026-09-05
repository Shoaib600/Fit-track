"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { deleteLog, getLogs, updateLog, type FoodLog } from "@/lib/storage";

type Draft = {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  quantity: string;
  meal: FoodLog["meal"];
};

const toDraft = (log: FoodLog): Draft => ({
  name: log.name,
  calories: String(log.calories),
  protein: String(log.protein),
  carbs: String(log.carbs),
  fat: String(log.fat),
  quantity: String(log.quantity),
  meal: log.meal,
});

export default function HistoryPage() {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

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

  const startEditing = (log: FoodLog) => {
    const normalizedId = String(log.id);
    setEditing(normalizedId);
    setDraft(toDraft({ ...log, id: normalizedId }));
  };

  const cancelEditing = () => {
    setEditing(null);
    setDraft(null);
  };

  const handleDelete = (id: string) => {
    const normalizedId = String(id);
    deleteLog(normalizedId);
    setLogs((current) => current.filter((log) => String(log.id) !== normalizedId));
    if (String(editing) === normalizedId) cancelEditing();
  };

  const handleUpdate = () => {
    if (!editing || !draft || !draft.name.trim()) return;
    const updates = {
      name: draft.name.trim(),
      calories: Number(draft.calories) || 0,
      protein: Number(draft.protein) || 0,
      carbs: Number(draft.carbs) || 0,
      fat: Number(draft.fat) || 0,
      quantity: Number(draft.quantity) || 0,
      meal: draft.meal,
    };
    setLogs((current) => current.map((log) => (log.id === editing ? { ...log, ...updates } : log)));
    updateLog(editing, updates);
    cancelEditing();
  };

  const grouped = useMemo(() => logs.reduce((acc, log) => {
    (acc[log.date] ??= []).push(log);
    return acc;
  }, {} as Record<string, FoodLog[]>), [logs]);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <main className="mx-auto max-w-lg px-5 pb-6 pt-8">
      <h1 className="mb-6 text-xl font-semibold">History</h1>
      {dates.length === 0 ? (
        <p className="py-16 text-center text-text-muted">No logs yet</p>
      ) : (
        <div className="flex flex-col gap-6">
          {dates.map((date) => {
            const dayLogs = grouped[date];
            const dayCals = dayLogs.reduce((sum, log) => sum + log.calories, 0);
            return (
              <section key={date} aria-labelledby={`date-${date}`}>
                <div className="mb-2 flex items-center justify-between">
                  <h2 id={`date-${date}`} className="text-sm font-medium text-text-secondary">
                    {new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                  </h2>
                  <span className="text-xs font-medium text-accent">{Math.round(dayCals)} kcal</span>
                </div>
                <div className="flex flex-col gap-2">
                  {dayLogs.map((log) => {
                    const isEditing = editing === log.id && draft;
                    return (
                      <article key={log.id} className="rounded-xl border border-border bg-surface px-4 py-3">
                        {isEditing ? (
                          <div className="flex flex-col gap-3">
                            <label className="text-xs text-text-muted">Food name<input autoFocus value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></label>
                            <div className="grid grid-cols-2 gap-2">
                              {(["calories", "protein", "carbs", "fat", "quantity"] as const).map((key) => (
                                <label key={key} className="text-[11px] capitalize text-text-muted">{key === "quantity" ? "Quantity (g)" : key}<input inputMode="decimal" type="number" value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-2 py-2 text-sm text-text-primary outline-none focus:border-accent" /></label>
                              ))}
                              <label className="text-[11px] text-text-muted">Meal<select value={draft.meal} onChange={(e) => setDraft({ ...draft, meal: e.target.value as FoodLog["meal"] })} className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-2 py-2 text-sm text-text-primary outline-none"><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></select></label>
                            </div>
                            <div className="flex justify-end gap-2">
                              <button type="button" onClick={cancelEditing} className="interactive-control rounded-lg p-3 text-text-muted" aria-label="Cancel edit"><X aria-hidden="true" /></button>
                              <button type="button" onClick={handleUpdate} className="interactive-control rounded-lg bg-accent p-3 text-ink" aria-label="Save edit"><Check aria-hidden="true" /></button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{log.name}</p><p className="text-xs text-text-muted">{log.meal} · {log.quantity}g · P{Math.round(log.protein)} C{Math.round(log.carbs)} F{Math.round(log.fat)}</p></div>
                            <div className="flex shrink-0 items-center gap-1"><span className="mr-1 text-sm font-medium">{Math.round(log.calories)}</span><button type="button" onClick={() => startEditing(log)} className="interactive-control rounded-lg p-3 text-text-secondary hover:text-accent" aria-label={`Edit ${log.name}`}><Pencil aria-hidden="true" /></button><button type="button" onClick={() => handleDelete(log.id)} className="interactive-control rounded-lg p-3 text-red-400 hover:text-red-300" aria-label={`Delete ${log.name}`}><Trash2 aria-hidden="true" /></button></div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
