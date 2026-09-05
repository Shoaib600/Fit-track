export type FoodLog = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number; // grams
  meal: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  date: string; // YYYY-MM-DD
  timestamp: number;
};

export function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getLogs(): FoodLog[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem("fittrack_logs") || "[]");
    if (!Array.isArray(value)) return [];
    return value.map((log) => ({
      ...log,
      id: String(log.id),
      timestamp: Number(log.timestamp) || 0,
      calories: Number(log.calories) || 0,
      protein: Number(log.protein) || 0,
      carbs: Number(log.carbs) || 0,
      fat: Number(log.fat) || 0,
      quantity: Number(log.quantity) || 0,
    })) as FoodLog[];
  } catch {
    return [];
  }
}

function publishLogs(logs: FoodLog[]) {
  if (typeof window === "undefined") return;
  const normalized = logs.map((log) => ({
    ...log,
    id: String(log.id),
    calories: Number(log.calories) || 0,
    protein: Number(log.protein) || 0,
    carbs: Number(log.carbs) || 0,
    fat: Number(log.fat) || 0,
    quantity: Number(log.quantity) || 0,
  }));
  localStorage.setItem("fittrack_logs", JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent("fittrack:logs-changed", { detail: normalized }));
}

export function saveLog(log: FoodLog) {
  publishLogs([log, ...getLogs()]);
}

export function updateLog(id: string, updates: Partial<Omit<FoodLog, "id" | "timestamp">>) {
  const normalizedId = String(id);
  publishLogs(getLogs().map((log) => (String(log.id) === normalizedId ? { ...log, ...updates } : log)));
}

export function deleteLog(id: string) {
  const normalizedId = String(id);
  publishLogs(getLogs().filter((log) => String(log.id) !== normalizedId));
}

export function getTodayTotals() {
  const today = getToday();
  const logs = getLogs().filter((l) => l.date === today);
  return logs.reduce(
    (acc, l) => ({
      calories: acc.calories + l.calories,
      protein: acc.protein + l.protein,
      carbs: acc.carbs + l.carbs,
      fat: acc.fat + l.fat,
      count: acc.count + 1,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, count: 0 }
  );
}

export function getGoals() {
  if (typeof window === "undefined") return { calories: 2200, protein: 150, carbs: 220, fat: 70 };
  try {
    return JSON.parse(
      localStorage.getItem("fittrack_goals") ||
        JSON.stringify({ calories: 2200, protein: 150, carbs: 220, fat: 70 })
    );
  } catch {
    return { calories: 2200, protein: 150, carbs: 220, fat: 70 };
  }
}

export function saveGoals(goals: { calories: number; protein: number; carbs: number; fat: number }) {
  localStorage.setItem("fittrack_goals", JSON.stringify(goals));
}
