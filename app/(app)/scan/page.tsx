"use client";

import { useState, useMemo } from "react";
import { searchFoods, findExactFood, type FoodItem } from "@/lib/foods";
import { saveLog, getToday } from "@/lib/storage";
import { useRouter } from "next/navigation";

type Meal = "Breakfast" | "Lunch" | "Dinner" | "Snack";

export default function ScanPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [quantity, setQuantity] = useState("100");
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [manual, setManual] = useState({ calories: "", protein: "", carbs: "", fat: "" });
  const [meal, setMeal] = useState<Meal>("Lunch");
  const [aiLoading, setAiLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiError, setAiError] = useState("");
  const [message, setMessage] = useState("");

  const results = useMemo(() => searchFoods(query).slice(0, 12), [query]);

  const handleSelect = (food: FoodItem) => {
    setSelected(food);
    setQuery(food.name);
    setAiError("");
    // prefill based on 100g or serving
    const qty = food.servingSize || 100;
    setQuantity(String(qty));
    const factor = qty / 100;
    setManual({
      calories: String(Math.round(food.calories * factor)),
      protein: String(Math.round(food.protein * factor * 10) / 10),
      carbs: String(Math.round(food.carbs * factor * 10) / 10),
      fat: String(Math.round(food.fat * factor * 10) / 10),
    });
  };

  const recalculateFromQty = (newQty: string) => {
    setQuantity(newQty);
    if (!selected) return;
    const qty = parseFloat(newQty) || 0;
    const factor = qty / 100;
    setManual({
      calories: String(Math.round(selected.calories * factor)),
      protein: String(Math.round(selected.protein * factor * 10) / 10),
      carbs: String(Math.round(selected.carbs * factor * 10) / 10),
      fat: String(Math.round(selected.fat * factor * 10) / 10),
    });
  };

  const handleCalculate = async () => {
    if (aiLoading) return;
    setAiError("");
    setMessage("");
    const exact = findExactFood(query);
    if (exact) {
      handleSelect(exact);
      setMessage("Matched from food library ✓");
      return;
    }

    // Try AI estimate
    setAiLoading(true);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food: query, quantity: parseFloat(quantity) || 100 }),
      });
      const data = await res.json();
      if (data.error) {
        setAiError(data.error);
      } else if (data.calories !== undefined) {
        setManual({
          calories: String(data.calories),
          protein: String(data.protein ?? 0),
          carbs: String(data.carbs ?? 0),
          fat: String(data.fat ?? 0),
        });
        setMessage("AI estimated macros ✓");
      } else {
        setAiError("Could not estimate. Enter values manually.");
      }
    } catch {
      setAiError("AI unavailable. Enter values manually below.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = () => {
    if (saving) return;
    const cal = parseFloat(manual.calories) || 0;
    const pro = parseFloat(manual.protein) || 0;
    const carb = parseFloat(manual.carbs) || 0;
    const fat = parseFloat(manual.fat) || 0;
    const qty = parseFloat(quantity) || 100;

    if (!query.trim() || cal === 0) {
      setAiError("Please enter food name and calories");
      return;
    }

    setSaving(true);
    saveLog({
      id: Date.now().toString(),
      name: query.trim(),
      calories: cal,
      protein: pro,
      carbs: carb,
      fat: fat,
      quantity: qty,
      meal,
      date: getToday(),
      timestamp: Date.now(),
    });

    setMessage("Saved! ✓");
    router.push("/home");
  };

  return (
    <div className="px-5 pt-6 pb-8 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-1">Log Food</h1>
      <p className="text-sm text-text-secondary mb-5">
        Type what you ate — we&apos;ll check the food library first, then use AI if needed.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">What did you eat?</label>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
              setAiError("");
              setMessage("");
            }}
            placeholder="e.g. chicken breast, biryani, Big Mac..."
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
            autoComplete="off"
          />
        </div>

        {/* Live search results */}
        {query.length >= 1 && !selected && results.length > 0 && (
          <div className="rounded-xl border border-border bg-surface max-h-48 overflow-y-auto no-scrollbar">
            {results.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleSelect(f)}
                className="interactive-control w-full text-left px-4 py-2.5 hover:bg-surface-2 border-b border-border last:border-0"
              >
                <p className="text-sm font-medium">{f.name}</p>
                <p className="text-xs text-text-muted">
                  {f.brand ? `${f.brand} · ` : ""}
                  {f.calories} kcal / 100g · P {f.protein}g
                </p>
              </button>
            ))}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">Quantity (grams)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => recalculateFromQty(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none focus:border-accent transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          disabled={aiLoading || !query.trim()}
          className="interactive-control w-full rounded-xl bg-accent py-3.5 font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {aiLoading ? "Estimating..." : "Calculate"}
        </button>

        {message && <p className="text-sm text-accent text-center">{message}</p>}
        {aiError && <p className="text-sm text-red-400 text-center">{aiError}</p>}

        {/* Manual entry */}
        <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
          <p className="text-xs font-medium text-text-secondary">Enter / edit macros</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-text-muted">Calories</label>
              <input
                type="number"
                value={manual.calories}
                onChange={(e) => setManual({ ...manual, calories: e.target.value })}
                className="w-full mt-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-[11px] text-text-muted">Protein (g)</label>
              <input
                type="number"
                value={manual.protein}
                onChange={(e) => setManual({ ...manual, protein: e.target.value })}
                className="w-full mt-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-[11px] text-text-muted">Carbs (g)</label>
              <input
                type="number"
                value={manual.carbs}
                onChange={(e) => setManual({ ...manual, carbs: e.target.value })}
                className="w-full mt-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-[11px] text-text-muted">Fat (g)</label>
              <input
                type="number"
                value={manual.fat}
                onChange={(e) => setManual({ ...manual, fat: e.target.value })}
                className="w-full mt-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            {(["Breakfast", "Lunch", "Dinner", "Snack"] as Meal[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMeal(m)}
                className={`interactive-control flex-1 rounded-lg py-2 text-xs font-medium ${
                  meal === m ? "bg-accent text-ink" : "bg-surface-2 text-text-secondary"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="interactive-control mt-2 w-full rounded-xl bg-accent/90 py-3.5 font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save & add to log"}
          </button>
        </div>
      </div>
    </div>
  );
}
