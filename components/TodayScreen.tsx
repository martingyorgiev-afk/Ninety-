
"use client";

import Link from "next/link";
import { Brain, ChevronRight, Dumbbell, Trophy } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ProgressRing from "./ProgressRing";
import BottomNav from "./BottomNav";
import type { TodayData } from "@/types";

const BRAND = "#cf176a";

export default function TodayScreen({ data }: { data: TodayData }) {
  const w = data.checkin?.weight_kg ?? 109;
  const toGoal = Math.max(0, w - 90);
  const progress = Math.max(0, Math.min(100, ((109 - w) / 19) * 100));

  return (
    <div className="shell">
      <header className="appHeader">
        <div>
          <div className="brand">NINETY</div>
          <div className="tagline">ROAD TO 90</div>
        </div>
        <div className="avatar">90</div>
      </header>

      <main className="content">
        <section className="heroCard card">
          <div>
            <p className="eyebrow">CURRENT WEIGHT</p>
            <div className="weight">{w.toFixed(1)} <span>kg</span></div>
            <div className="subtle">{toGoal.toFixed(1)} kg to go</div>
            <div className="goalBar">
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="goalMeta"><b>Target 90.0 kg</b><span>{progress.toFixed(0)}% complete</span></div>
          </div>
          <div className="goalCircle" style={{ "--p": `${progress * 3.6}deg` } as React.CSSProperties}>
            <div><strong>{progress.toFixed(0)}%</strong><span>TO GOAL</span></div>
          </div>
        </section>

        <section className="metricGrid card">
          <ProgressRing value={data.nutrition.calories} max={data.nutrition.caloriesGoal} color="#ff6b78" label="Calories" valueLabel={`${data.nutrition.calories}`} />
          <ProgressRing value={data.nutrition.proteinG} max={data.nutrition.proteinGoalG} color="#54d6a8" label="Protein" valueLabel={`${data.nutrition.proteinG}g`} />
          <ProgressRing value={data.nutrition.waterL} max={data.nutrition.waterGoalL} color="#62bdf6" label="Water" valueLabel={`${data.nutrition.waterL.toFixed(1)}L`} />
        </section>

        <section className="split">
          <article className="card nextWorkout">
            <div className="sectionLabel">NEXT WORKOUT</div>
            <div className="workoutBody">
              <div>
                <h2>{data.nextWorkout?.name ?? "Recovery"}</h2>
                <p>{data.nextWorkout?.subtitle ?? "No session planned"}</p>
                <small>~ {data.nextWorkout?.durationMin ?? 0} min</small>
              </div>
              <div className="lineIcon"><Dumbbell size={44}/></div>
            </div>
         <Link href="/train" className="primary">
  Start Workout <ChevronRight size={18} />
</Link>
          </article>

          <article className="card readiness">
            <div className="sectionLabel">READINESS</div>
            <div className="readinessScore">{data.readiness.score ?? "—"}<span>%</span></div>
            <b style={{ color: "#42b845" }}>{data.readiness.label}</b>
            <div className="recoveryStat">
              <span>Sleep</span>
              <strong>{data.checkin?.sleep_hours?.toFixed(1) ?? "—"} h</strong>
            </div>
          </article>
        </section>

        <section className="card insight">
          <div className="insightIcon"><Brain size={30}/></div>
          <div>
            <div className="sectionLabel" style={{color: BRAND}}>NINETY INSIGHT</div>
            <h3>{data.insight.title}</h3>
            <p>{data.insight.body}</p>
          </div>
          <ChevronRight className="chev"/>
        </section>

        <section className="triple">
          <article className="card miniCard">
            <div className="sectionLabel">BODY SCAN</div>
            <div className="bodyGlyph">◯<br/>│<br/>╱╲</div>
            <button>See progress</button>
          </article>
          <article className="card miniCard">
            <div className="sectionLabel">WEIGHT TREND</div>
            <div className="miniWeight">{w.toFixed(1)} <span>kg</span></div>
            <div style={{height: 86}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.weightTrend}>
                  <XAxis dataKey="date" hide/>
                  <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} hide/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="weight" stroke={BRAND} strokeWidth={3} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <button>View progress</button>
          </article>
          <article className="card miniCard">
            <div className="sectionLabel">ACHIEVEMENTS</div>
            <div className="trophy"><Trophy size={32}/></div>
            <strong>Start</strong>
            <small>First milestone</small>
          </article>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
