export type TodayData = {
  checkin?: {
    weight_kg?: number;
  };

  currentWeight?: number;
  targetWeight?: number;
  calories?: number;
  protein?: number;
  water?: number;
  readiness?: number;
  sleepHours?: number;
};
