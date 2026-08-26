
import TodayScreen from "@/components/TodayScreen";
import { loadToday } from "@/lib/today";

export default async function Page() {
  const data = await loadToday();
  return <TodayScreen data={data} />;
}
