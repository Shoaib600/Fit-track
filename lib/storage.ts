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
    const parsed = JSON.parse(localStorage.getItem("fittrack_logs") || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map((log, index) => ({
      ...log,
      id: String(log.id ?? `${log.timestamp ?? Date.now()}-${index}`),
    }));
  } catch {
    return [];
  }
}

export function saveLog(log: FoodLog) {
  const logs = getLogs();
  logs.unshift(log);
  localStorage.setItem("fittrack_logs", JSON.stringify(logs));
}

function notifyLogsChanged() {
  window.dispatchEvent(new Event("fittrack:logs-changed"));
}

export function updateLog(id: string, updates: Partial<Omit<FoodLog, "id">>) {
  const normalizedId = String(id);
  const logs = getLogs().map((log) =>
    String(log.id) === normalizedId ? { ...log, ...updates, id: normalizedId } : log
  );
  localStorage.setItem("fittrack_logs", JSON.stringify(logs));
  notifyLogsChanged();
}

export function deleteLog(id: string) {
  const normalizedId = String(id);
  const logs = getLogs().filter((log) => String(log.id) !== normalizedId);
  localStorage.setItem("fittrack_logs", JSON.stringify(logs));
  notifyLogsChanged();
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
