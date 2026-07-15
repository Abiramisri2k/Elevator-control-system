import { FLOOR_COUNT, FLOOR_HEIGHT } from "../constants/elevatorConstants";
import { DirectionArrow } from "./FloorCallPanel";

export function CarInfoPanel({ elevator, dispatch }) {
  const floors = Array.from({ length: FLOOR_COUNT }, (_, i) => i + 1).reverse();

  return (
    <div className="w-24 shrink-0 rounded-lg border border-zinc-700 bg-zinc-900 p-2 flex flex-col gap-2">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500">Car {elevator.id}</div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className="font-mono text-lg font-bold text-amber-400">{elevator.currentFloor}</span>
          <DirectionArrow
            direction={elevator.direction}
            className={`text-xs ${elevator.direction === "idle" ? "text-zinc-600" : "text-amber-400"}`}
          />
        </div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span
            className={`w-1.5 h-1.5 rounded-full ${elevator.doorState === "open" ? "bg-emerald-400" : "bg-zinc-600"}`}
          />
          <span className="text-[9px] text-zinc-500">{elevator.doorState === "open" ? "doors open" : "doors closed"}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {floors.map((floor) => (
          <button
            key={floor}
            onClick={() => dispatch({ type: "CAR_CALL", elevatorId: elevator.id, floor })}
            className={`h-6 rounded text-[10px] font-mono border transition-colors
              ${
                elevator.targetFloors.includes(floor)
                  ? "bg-amber-500 border-amber-400 text-zinc-950"
                  : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-amber-500 hover:text-amber-400"
              }`}
          >
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
}