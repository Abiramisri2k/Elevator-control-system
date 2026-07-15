import { tickOne } from "../algorithms/movement";
import { addTarget } from "../algorithms/movement";
import { pickBestElevatorIndex } from "../algorithms/scheduler";
import { DOOR_OPEN_TICKS } from "../constants/elevatorConstants";
import { makeInitialState } from "./initialState";

export function reducer(state, action) {
  switch (action.type) {
    case "TICK": {
      const elevators = state.elevators.map(tickOne);
      const hallCalls = { ...state.hallCalls };

      elevators.forEach((elevator) => {
        if (elevator.arrivedFloor != null) {
          const floor = elevator.arrivedFloor;
          hallCalls[floor] = { up: false, down: false };
          delete elevator.arrivedFloor;
        }
      });

      return { ...state, elevators, hallCalls };
    }

    case "HALL_CALL": {
      const { floor, direction } = action;
      if (state.hallCalls[floor][direction]) return state; // already requested

      const bestIndex = pickBestElevatorIndex(state.elevators, {
        floor,
        direction,
      });

      const best = state.elevators[bestIndex];

      if (best.currentFloor === floor) {
        const elevators = state.elevators.map((e, i) =>
          i === bestIndex
            ? {
                ...e,
                doorState: "open",
                doorTimer: DOOR_OPEN_TICKS,
                direction: "idle",
              }
            : e,
        );
        const hallCalls = {
          ...state.hallCalls,
          [floor]: { up: false, down: false },
        };
        return { ...state, elevators, hallCalls };
      }

      const elevators = state.elevators.map((e, i) =>
        i === bestIndex ? addTarget(e, floor) : e,
      );
      const hallCalls = {
        ...state.hallCalls,
        [floor]: { ...state.hallCalls[floor], [direction]: true },
      };
      return { ...state, elevators, hallCalls };
    }

    case "CAR_CALL": {
      const { elevatorId, floor } = action;
      const elevators = state.elevators.map((e) =>
        e.id === elevatorId ? addTarget(e, floor) : e,
      );
      return { ...state, elevators };
    }

    case "RESET":
      return makeInitialState();

    default:
      return state;
  }
}