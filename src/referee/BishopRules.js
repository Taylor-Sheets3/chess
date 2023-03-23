import { tileIsOccupied, tileIsOccupiedByAlly } from './HelperFunctions';

export function bishopRules(
  initialPosition: object,
  newPosition: object,
  team: string,
  boardState: object
) {
  let horizontalDelta = Math.abs(initialPosition.x - newPosition.x);
  let verticalDelta = Math.abs(initialPosition.y - newPosition.y);
  let horizontalDirection = initialPosition.x - newPosition.x > 0 ? -1 : 1;
  let verticalDirection = initialPosition.y - newPosition.y > 0 ? -1 : 1;

  for (let i = 1; i < horizontalDelta; i ++) {
    let searchedTile = {
      x: initialPosition.x + i * horizontalDirection,
      y: initialPosition.y + i * verticalDirection,
    }
    if (tileIsOccupied(searchedTile, boardState, team)) {
      return false;
    }
  }

  if (horizontalDelta === verticalDelta && !tileIsOccupiedByAlly(newPosition, boardState, team)) {
    return true;
  } else {
    return false;
  }
}