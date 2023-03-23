import { tileIsOccupiedByAlly } from './HelperFunctions';

export function kingRules (
  initialPosition: object,
  newPosition: object,
  team: string,
  boardState: object
) {
  let horizontalDelta = Math.abs(initialPosition.x - newPosition.x);
  let verticalDelta = Math.abs(initialPosition.y - newPosition.y);

  if (horizontalDelta < 2  && verticalDelta < 2 && !tileIsOccupiedByAlly(newPosition, boardState, team)) {
    return true;
  } else {
    return false;
  }
}