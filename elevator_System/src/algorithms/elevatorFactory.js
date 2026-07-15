export function createElevator(id, startFloor = 1) {
  return {
    id,
    currentFloor: startFloor,
    direction: "idle", // 'up' | 'down' | 'idle'
    targetFloors: [], // floors this car still needs to visit
    doorState: "closed", // 'open' | 'closed'
    doorTimer: 0,
  };
}