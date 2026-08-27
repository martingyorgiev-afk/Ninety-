"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, Minus, Plus, TimerReset } from "lucide-react";
import Link from "next/link";

type SetRow = { kg: string; reps: string; done: boolean };
type Exercise = {
  name: string;
  target: string;
  previous: string;
  rest: number;
  sets: SetRow[];
};

const initial: Exercise[] = [
  {
    name: "Incline Dumbbell Press",
    target: "3 × 8–10",
    previous: "32 kg × 10",
    rest: 120,
    sets: Array.from({ length: 3 }, () => ({
      kg: "32",
      reps: "10",
      done: false,
    })),
  },
  {
    name: "Chest Press",
    target: "3 × 8–12",
    previous: "80 kg × 10",
    rest: 120,
    sets: Array.from({ length: 3 }, () => ({
      kg: "80",
      reps: "10",
      done: false,
    })),
  },
  {
    name: "Cable Fly",
    target: "3 × 10–15",
    previous: "20 kg × 13",
    rest: 90,
    sets: Array.from({ length: 3 }, () => ({
      kg: "20",
      reps: "12",
      done: false,
    })),
  },
  {
    name: "Lateral Raise",
    target: "4 × 12–15",
    previous: "12 kg × 14",
    rest: 75,
    sets: Array.from({ length: 4 }, () => ({
      kg: "12",
      reps: "14",
      done: false,
    })),
  },
  {
    name: "Triceps Pressdown",
    target: "3 × 10–15",
    previous: "35 kg × 12",
    rest: 75,
    sets: Array.from({ length: 3 }, () => ({
      kg: "35",
      reps: "12",
      done: false,
    })),
  },
];

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function Train() {
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [rest, setRest] = useState(0);
  const [ex, setEx] = useState(initial);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished) return;
    const i = setInterval(() => setElapsed((x) => x + 1), 1000);
    return () => clearInterval(i);
  }, [started, finished]);

  useEffect(() => {
    if (rest <= 0) return;
    const i = setInterval(() => setRest((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(i);
  }, [rest]);

  const done = useMemo(
    () => ex.flatMap((e) => e.sets).filter((s) => s.done).length,
    [ex]
  );

  const total = useMemo(
    () => ex.flatMap((e) => e.sets).length,
    [ex]
  );

  const update = (
    ei: number,
    si: number,
    k: "kg" | "reps",
    v: string
  ) =>
    setEx((a) =>
      a.map((e, x) =>
        x !== ei
          ? e
          : {
              ...e,
              sets: e.sets.map((s, y) =>
                y !== si ? s : { ...s, [k]: v }
              ),
            }
      )
    );

  const toggle = (ei: number, si: number) =>
    setEx((a) =>
      a.map((e, x) =>
        x !== ei
          ? e
          : {
              ...e,
              sets: e.sets.map((s, y) => {
                if (y !== si) return s;

                const next = !s.done;
                if (next) setRest(e.rest);

                return { ...s, done: next };
              }),
            }
      )
    );

  return (
    <div className="shell trainShell">
      <header className="trainHeader">
        <Link href="/" className="back">
          <ChevronLeft />
        </Link>

        <div>
          <div className="brand">NINETY</div>
          <div className="tagline">TRAIN</div>
        </div>

        <div className="trainClock">{fmt(elapsed)}</div>
      </header>

      <main className="content trainContent">
        {!started ? (
          <section className="card trainIntro">
            <div className="sectionLabel">TODAY'S SESSION</div>
            <h1>Push Day</h1>
            <p>Chest · Shoulders · Triceps</p>

            <div className="trainStats">
              <span><b>5</b> exercises</span>
              <span><b>16</b> sets</span>
              <span><b>~75</b> min</span>
            </div>

            <button
              className="primary big"
              onClick={() => setStarted(true)}
            >
              Start Workout
            </button>
          </section>
        ) : finished ? (
          <section className="card finishCard">
            <div className="finishCheck">
              <Check />
            </div>

            <div className="sectionLabel">WORKOUT COMPLETE</div>
            <h1>Push Day</h1>
            <p>{done} sets completed · {fmt(elapsed)}</p>

            <Link className="primary" href="/">
              Back to Today
            </Link>
          </section>
        ) : (
          <>
            <section className="sessionBar">
              <div>
                <span>Push Day</span>
                <strong>{fmt(elapsed)}</strong>
              </div>

              <div className="progressText">
                {done}/{total} sets
              </div>
            </section>

            {rest > 0 && (
              <section className="restCard">
                <TimerReset />

                <div>
                  <small>REST TIMER</small>
                  <strong>{fmt(rest)}</strong>
                </div>

                <button onClick={() => setRest(Math.max(0, rest - 15))}>
                  <Minus size={16} />15
                </button>

                <button onClick={() => setRest(rest + 15)}>
                  <Plus size={16} />15
                </button>

                <button onClick={() => setRest(0)}>
                  Skip
                </button>
              </section>
            )}

            {ex.map((e, ei) => (
              <section className="card exerciseCard" key={e.name}>
                <div className="exerciseTop">
                  <div>
                    <div className="sectionLabel">
                      EXERCISE {ei + 1}
                    </div>

                    <h2>{e.name}</h2>
                    <p>{e.target} · Rest {e.rest}s</p>
                  </div>

                  <div className="previous">
                    <small>PREVIOUS</small>
                    <b>{e.previous}</b>
                  </div>
                </div>

                <div className="setHead">
                  <span>SET</span>
                  <span>KG</span>
                  <span>REPS</span>
                  <span>DONE</span>
                </div>

                {e.sets.map((s, si) => (
                  <div
                    className={`setRow ${s.done ? "setDone" : ""}`}
                    key={si}
                  >
                    <b>{si + 1}</b>

                    <input
                      inputMode="decimal"
                      value={s.kg}
                      onChange={(v) =>
                        update(ei, si, "kg", v.target.value)
                      }
                    />

                    <input
                      inputMode="numeric"
                      value={s.reps}
                      onChange={(v) =>
                        update(ei, si, "reps", v.target.value)
                      }
                    />

                    <button
                      className="doneBtn"
                      onClick={() => toggle(ei, si)}
                    >
                      {s.done ? <Check size={18} /> : null}
                    </button>
                  </div>
                ))}
              </section>
            ))}

            <button
              className="finishBtn"
              onClick={() => setFinished(true)}
            >
              Finish Workout
            </button>
          </>
        )}
      </main>

    
    </div>
  );
}
