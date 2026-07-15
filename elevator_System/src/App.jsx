import { useReducer, useRef, useEffect } from "react";

import { reducer } from "./reducer/elevatorReducer";

import { makeInitialState } from "./reducer/initialState";

import {FloorCallPanel} from "./components/FloorCallPanel";

import {CarInfoPanel} from "./components/CarInfoPanel";

import {Shaft} from "./components/Shaft";

import { FLOOR_COUNT, TICK_MS } from "./constants/elevatorConstants";

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, makeInitialState);
  const demoTimeouts = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: "TICK" }), TICK_MS);
    return () => clearInterval(interval);
  }, []);

  const pendingCalls = Object.values(state.hallCalls).filter((c) => c.up || c.down).length;
  const activeCars = state.elevators.filter((e) => e.direction !== "idle").length;

  function runDemo() {
    demoTimeouts.current.forEach(clearTimeout);
    demoTimeouts.current = [];

    const scenarios = [
      { floor: 8, direction: "down" },
      { floor: 2, direction: "up" },
      { floor: 5, direction: "up" },
      { floor: 1, direction: "up" },
      { floor: 7, direction: "down" },
      { floor: 4, direction: "down" },
    ];

    scenarios.forEach((call, i) => {
      const t = setTimeout(() => dispatch({ type: "HALL_CALL", ...call }), i * 500);
      demoTimeouts.current.push(t);
    });
  }

  function reset() {
    demoTimeouts.current.forEach(clearTimeout);
    demoTimeouts.current = [];
    dispatch({ type: "RESET" });
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        {/* header panel */}
        <div className="relative rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-4 mb-8 flex items-center justify-between flex-wrap gap-4">
          <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <span className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-700" />

          <div>
            <h1 className="font-mono text-lg font-bold tracking-wide text-zinc-100">ELEVATOR CONTROL SYSTEM</h1>
            <p className="text-xs text-zinc-500 mt-0.5">3-car dispatch · 8 floors · LOOK scheduling</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right font-mono text-[11px] text-zinc-500 leading-tight">
              <div>
                calls pending: <span className="text-amber-400">{pendingCalls}</span>
              </div>
              <div>
                cars moving: <span className="text-amber-400">{activeCars}</span>
              </div>
            </div>
            <button
              onClick={runDemo}
              className="px-3 py-1.5 rounded border border-amber-500 text-amber-400 text-xs font-mono hover:bg-amber-500 hover:text-zinc-950 transition-colors"
            >
              Run demo
            </button>
            <button
              onClick={reset}
              className="px-3 py-1.5 rounded border border-zinc-700 text-zinc-400 text-xs font-mono hover:border-zinc-500 hover:text-zinc-200 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* building visualization */}
        <div className="flex justify-center gap-6 overflow-x-auto pb-2">
          <FloorCallPanel hallCalls={state.hallCalls} dispatch={dispatch} />

          {state.elevators.map((elevator) => (
            <div key={elevator.id} className="flex flex-col items-center gap-3">
              <Shaft elevator={elevator} />
              <CarInfoPanel elevator={elevator} dispatch={dispatch} />
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-zinc-600 mt-8 font-mono">
          Click ▲ / ▼ on the left for hall calls, or a number under a car for a car call.
        </p>
      </div>
    </div>
  );
}