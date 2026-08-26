
import type { TodayData } from "@/types";

export const mockToday: TodayData = {
  checkin: {
    date: new Date().toISOString().slice(0, 10),
    weight_kg: 109.0,
    sleep_hours: 7.6,
    energy_10: 8,
    stress_10: 3,
    elbow_10: 2,
    knee_10: 2
  },
  nutrition: {
    calories: 0,
    caloriesGoal: 2200,
    proteinG: 0,
    proteinGoalG: 190,
    waterL: 0,
    waterGoalL: 4.0
  },
  nextWorkout: {
    id: "push",
    name: "Push",
    subtitle: "Chest · Shoulders",
    durationMin: 75
  },
  readiness: {
    score: 82,
    label: "Good to go"
  },
  insight: {
    title: "Start clean today.",
    body: "Keep calories controlled, hit protein, and train with quality. NINETY will use your trend—not one day—to adjust."
  },
  weightTrend: [
    { date: "Mon", weight: 109.5 },
    { date: "Tue", weight: 109.3 },
    { date: "Wed", weight: 109.2 },
    { date: "Thu", weight: 109.1 },
    { date: "Fri", weight: 109.0 }
  ]
};
