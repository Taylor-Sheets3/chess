import { tileIsOccupied, tileIsOccupiedByAlly } from './HelperFunctions';

export function queenRules (
  initialPosition: object,
  newPosition: object,
  team: string,
  boardState: object
) {
  let horizontalDelta = Math.abs(initialPosition.x - newPosition.x);
  let verticalDelta = Math.abs(initialPosition.y - newPosition.y);
  let horizontalDirection = initialPosition.x - newPosition.x > 0 ? -1 : 1;
  let verticalDirection = initialPosition.y - newPosition.y > 0 ? -1 : 1;

  if (horizontalDelta === 0 && verticalDelta) {
    for (let i = 1; i < verticalDelta; i ++) {
      let searchedTile = {
        x: initialPosition.x,
        y: initialPosition.y + i * verticalDirection,
      }

      if (tileIsOccupied(searchedTile, boardState, team)) {
        return false
      }
    }

    return !tileIsOccupiedByAlly(newPosition, boardState, team);
  } else if (verticalDelta === 0 && horizontalDelta) {
    for (let i = 1; i < horizontalDelta; i ++) {
      let searchedTile = {
        x: initialPosition.x + i * horizontalDirection,
        y: initialPosition.y,
      }

      if (tileIsOccupied(searchedTile, boardState, team)) {
        return false
      }
    }

    return !tileIsOccupiedByAlly(newPosition, boardState, team);
  } else if (horizontalDelta === verticalDelta) {
    for (let i = 1; i < horizontalDelta; i ++) {
      let searchedTile = {
        x: initialPosition.x + i * horizontalDirection,
        y: initialPosition.y + i * verticalDirection,
      }
      if (tileIsOccupied(searchedTile, boardState, team)) {
        return false;
      }
    }
    return !tileIsOccupiedByAlly(newPosition, boardState, team);
  }
}