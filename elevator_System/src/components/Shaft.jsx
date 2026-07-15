import { FLOOR_COUNT, FLOOR_HEIGHT } from "../constants/elevatorConstants";
import { DirectionArrow } from "./FloorCallPanel";

export function Shaft({ elevator }) {
  const shaftHeight = FLOOR_COUNT * FLOOR_HEIGHT;
  const offsetY = (FLOOR_COUNT - elevator.currentFloor) * FLOOR_HEIGHT;
  const doorOpen = elevator.doorState === "open";

  return (
    <div
      style={{ height: shaftHeight, width: 88 }}
      className="relative rounded-lg border border-zinc-700 bg-zinc-900/60 overflow-hidden shrink-0"
    >
      {/* floor divider lines */}
      {Array.from({ length: FLOOR_COUNT - 1 }, (_, i) => (
        <div
          key={i}
          style={{ top: (i + 1) * FLOOR_HEIGHT }}
          className="absolute left-0 right-0 border-t border-zinc-800"
        />
      ))}

      {/* the car itself */}
      <div
        style={{
          top: offsetY + 4,
          left: 4,
          right: 4,
          height: FLOOR_HEIGHT - 8,
          transition: "top 500ms ease-in-out",
        }}
        className="absolute rounded-md border border-zinc-500 bg-zinc-700 shadow-lg flex flex-col items-center justify-center gap-0.5"
      >
        <div className="flex items-center gap-1 bg-black/70 rounded px-1.5 py-0.5">
          <span className="font-mono text-[11px] font-bold text-amber-400 leading-none">
            {String(elevator.currentFloor).padStart(2, "0")}
          </span>
          <DirectionArrow
            direction={elevator.direction}
            className={`text-[9px] leading-none ${elevator.direction === "idle" ? "text-zinc-600" : "text-amber-400"}`}
          />
        </div>

        {/* door slit — two panels that slide apart when open */}
        <div className="w-8 h-1.5 flex justify-between">
          <div
            className={`h-full bg-zinc-400 rounded-sm transition-all duration-300 ${doorOpen ? "w-1" : "w-4"}`}
          />
          <div
            className={`h-full bg-zinc-400 rounded-sm transition-all duration-300 ${doorOpen ? "w-1" : "w-4"}`}
          />
        </div>
      </div>
    </div>
  );
}