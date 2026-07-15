import { createElevator } from "../algorithms/elevatorFactory";
import { FLOOR_COUNT } from "../constants/elevatorConstants";


export function makeInitialState() {
  return {
    elevators: [createElevator(1, 1), createElevator(2, 3), createElevator(3, 6)],
    // hallCalls[floor] = { up: bool, down: bool } — lights the panel buttons
    hallCalls: Object.fromEntries(
      Array.from({ length: FLOOR_COUNT }, (_, i) => [i + 1, { up: false, down: false }])
    ),
  };
}