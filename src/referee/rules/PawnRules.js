import { tileIsOccupied, tileIsOccupiedByOpponent } from './HelperFunctions';

export function pawnRules(
  initialPosition: object,
  newPosition: object,
  team: string,
  boardState: object) {
    const firstRow = (team === 'w' ? 1 : 6);
    const pawnDirection = (team === 'w' ? 1 : -1);

    //special case, first row moves twice
    if (newPosition.x === initialPosition.x && initialPosition.y === firstRow && newPosition.y - initialPosition.y === (2 * pawnDirection)) {
      if (!tileIsOccupied(newPosition, boardState) &&
          !tileIsOccupied(newPosition - pawnDirection, boardState)) {
        return true;
      }
    //normal move cases
    } else if (newPosition.x === initialPosition.x && newPosition.y - initialPosition.y === pawnDirection) {
      if (!tileIsOccupied(newPosition, boardState)) {
        return true;
      }
    //attack logic
    } else if ((
      initialPosition.x - 1 === newPosition.x || initialPosition.x + 1 === newPosition.x) && newPosition.y - initialPosition.y === pawnDirection &&
      tileIsOccupiedByOpponent(newPosition, boardState, team)) {
        return true;
    } else {
      return false;
    }
}