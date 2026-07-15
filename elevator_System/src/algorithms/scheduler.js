export function decideDirection(elevator) {
  const { currentFloor, targetFloors, direction } = elevator;
  if (targetFloors.length === 0) return "idle";

  const hasAbove = targetFloors.some((f) => f > currentFloor);
  const hasBelow = targetFloors.some((f) => f < currentFloor);

  if (direction === "up") return hasAbove ? "up" : hasBelow ? "down" : "idle";
  if (direction === "down") return hasBelow ? "down" : hasAbove ? "up" : "idle";
  return hasAbove ? "up" : hasBelow ? "down" : "idle";
}

export function scoreElevator(elevator, call) {
  const distance = Math.abs(elevator.currentFloor - call.floor);
  if (elevator.direction === "idle") return distance;

  const sameDirection =
    (elevator.direction === "up" && call.direction === "up" && call.floor >= elevator.currentFloor) ||
    (elevator.direction === "down" && call.direction === "down" && call.floor <= elevator.currentFloor);

  return sameDirection ? distance : distance + 1000;
}

export function pickBestElevatorIndex(elevators, call) {
  let bestIndex = 0;
  let bestScore = Infinity;
  elevators.forEach((elevator, i) => {
    const score = scoreElevator(elevator, call);
    if (score < bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  });
  return bestIndex;
}