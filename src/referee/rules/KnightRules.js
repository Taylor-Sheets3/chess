import { tileIsOccupiedByAlly } from './HelperFunctions';

export function knightRules(
  initialPosition: object,
  newPosition: object,
  team: string,
  boardState: object
) {
  let horizontalDelta = Math.abs(initialPosition.x - newPosition.x);
  let verticalDelta = Math.abs(initialPosition.y - newPosition.y);

  if ((horizontalDelta && verticalDelta) &&
    horizontalDelta + verticalDelta === 3 &&
    !tileIsOccupiedByAlly(newPosition, boardState, team)) {
      return true;
    } else {
      return false
    }
}