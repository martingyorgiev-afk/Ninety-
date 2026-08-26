
import { mockToday } from "@/lib/mock";
import type { TodayData } from "@/types";

export async function loadToday(): Promise<TodayData> {
  // Foundation build:
  // The UI works immediately with mock fallback.
  // Once Supabase env vars are provided, replace this adapter with authenticated queries.
  return mockToday;
}
