export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: array) {
    const piece = boardState.find(p => p.x === x && p.y === y)

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpponent(x: number, y: number, boardState: array, team: string) {
    const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);
  
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isValidMove(previousX: number, previousY: number, newX: number, newY: number, pieceType: string, team: string, boardState: array) {

    if (pieceType === 'pawn') {
      const firstRow = (team === 'w' ? 1 : 6);
      const pawnDirection = (team === 'w' ? 1: -1);
      //special case, first row moves twice
      if (newX === previousX && previousY === firstRow && newY - previousY === (2 * pawnDirection)) {
        if (!this.tileIsOccupied(newX, newY, boardState) &&
            !this.tileIsOccupied(newX, newY - pawnDirection, boardState))
          {
          return true;
        }
      //normal move cases
      } else if (newX === previousX && newY - previousY === pawnDirection) {
        if (!this.tileIsOccupied(newX, newY, boardState)) {
          return true;
        }
      //attack logic
      } else if ((previousX - 1 === newX || previousX + 1 === newX) &&
                  newY - previousY === pawnDirection &&
                  this.tileIsOccupiedByOpponent(newX, newY, boardState, team)
                ) {
          return true;
      }
    }

    return false;
  }
}