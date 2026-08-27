export type DailyCheckIn = {
  id?: string;
  user_id?: string;
  date: string;
  weight_kg: number | null;
  sleep_hours: number | null;
  energy_10: number | null;
  stress_10: number | null;
  elbow_10: number | null;
  knee_10: number | null;
};

export type NutritionSummary = {
  calories: number;
  caloriesGoal: number;
  proteinG: number;
  proteinGoalG: number;
  waterL: number;
  waterGoalL: number;
};

export type TodayData = {
  checkin: DailyCheckIn | null;

  nutrition: NutritionSummary;

  nextWorkout: {
    id: string;
    name: string;
    subtitle: string;
    durationMin: number;
  } | null;

  readiness: {
    score: number | null;
    label: string;
  };

  insight: {
    title: string;
    body: string;
  };

  weightTrend: {
    date: string;
    weight: number;
  }[];
};
