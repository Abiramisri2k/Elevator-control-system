import { FLOOR_COUNT, FLOOR_HEIGHT } from "../constants/elevatorConstants";

export function DirectionArrow({ direction, className = "" }) {
  if (direction === "up") return <span className={className}>▲</span>;
  if (direction === "down") return <span className={className}>▼</span>;
  return <span className={className}>•</span>;
}

export function FloorCallPanel({ hallCalls, dispatch }) {
  const floors = Array.from({ length: FLOOR_COUNT }, (_, i) => FLOOR_COUNT - i);

  return (
    <div className="flex flex-col shrink-0">
      {floors.map((floor) => (
        <div key={floor} style={{ height: FLOOR_HEIGHT }} className="flex items-center justify-end gap-2 pr-3">
          <span className="font-mono text-xs text-zinc-500 w-5 text-right">{floor}</span>

          <button
            onClick={() => dispatch({ type: "HALL_CALL", floor, direction: "up" })}
            disabled={floor === FLOOR_COUNT}
            className={`w-7 h-7 rounded border text-xs flex items-center justify-center transition-colors
              ${floor === FLOOR_COUNT ? "opacity-0 pointer-events-none" : ""}
              ${
                hallCalls[floor].up
                  ? "bg-amber-500 border-amber-400 text-zinc-950"
                  : "bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-amber-500 hover:text-amber-400"
              }`}
          >
            ▲
          </button>

          <button
            onClick={() => dispatch({ type: "HALL_CALL", floor, direction: "down" })}
            disabled={floor === 1}
            className={`w-7 h-7 rounded border text-xs flex items-center justify-center transition-colors
              ${floor === 1 ? "opacity-0 pointer-events-none" : ""}
              ${
                hallCalls[floor].down
                  ? "bg-amber-500 border-amber-400 text-zinc-950"
                  : "bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-amber-500 hover:text-amber-400"
              }`}
          >
            ▼
          </button>
        </div>
      ))}
    </div>
  );
}
