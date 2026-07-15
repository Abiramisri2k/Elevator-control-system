import { DOOR_OPEN_TICKS } from "../constants/elevatorConstants";
import { decideDirection } from "./scheduler";

export function addTarget(elevator, floor) {
  if (elevator.currentFloor === floor || elevator.targetFloors.includes(floor)) {
    return elevator;
  }
  const targetFloors = [...elevator.targetFloors, floor].sort((a, b) => a - b);
  let direction = elevator.direction;
  if (direction === "idle") direction = floor > elevator.currentFloor ? "up" : "down";
  return { ...elevator, targetFloors, direction };
}

export function tickOne(elevator) {
  if (elevator.doorTimer > 0) {
    const doorTimer = elevator.doorTimer - 1;
    return { ...elevator, doorTimer, doorState: doorTimer === 0 ? "closed" : "open" };
  }

  if (elevator.targetFloors.length === 0) {
    return elevator.direction === "idle" ? elevator : { ...elevator, direction: "idle" };
  }

  if (elevator.targetFloors.includes(elevator.currentFloor)) {
    const targetFloors = elevator.targetFloors.filter((f) => f !== elevator.currentFloor);
    return {
      ...elevator,
      targetFloors,
      doorState: "open",
      doorTimer: DOOR_OPEN_TICKS,
      arrivedFloor: elevator.currentFloor,
    };
  }

  const direction = decideDirection(elevator);
  const currentFloor =
    direction === "up" ? elevator.currentFloor + 1 : direction === "down" ? elevator.currentFloor - 1 : elevator.currentFloor;
  return { ...elevator, direction, currentFloor };
}