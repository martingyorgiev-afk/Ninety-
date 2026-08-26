
import { Dumbbell, Home, MoreHorizontal, ScanLine, Utensils } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="bottomNav">
      <button className="active"><Home size={20}/><span>Today</span></button>
      <button><Dumbbell size={20}/><span>Train</span></button>
      <button><Utensils size={20}/><span>Nutrition</span></button>
      <button><ScanLine size={20}/><span>Body</span></button>
      <button><MoreHorizontal size={20}/><span>More</span></button>
    </nav>
  );
}
