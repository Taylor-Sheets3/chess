export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: object) {
    const piece = boardState.find(p => p.position.x === x && p.position.y === y)

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpponent(x: number, y: number, boardState: object, team: string) {
    console.log('tileIsOccupied function');
    const piece = boardState.find((p) => p.position.x === x && p.position.y === y && p.team !== team);

    if (piece) {
      return true;
    } else {
      return false;
    }
  }


  isEnPassantMove(initialPosition: object, newPosition: object, pieceType: string, team: string, boardState: object) {
    const pawnDirection = team === 'w' ? 1 : -1;

    if (pieceType === 'pawn') {
      if ((newPosition.x - initialPosition.x === -1 || newPosition.x - initialPosition.x === 1) && newPosition.y - initialPosition.y === pawnDirection) {
        const piece = boardState.find(
          p => p.position.x === newPosition.x && p.position.y === newPosition.y - pawnDirection && p.enPassant
        )
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  isValidMove(initialPosition: object, newPosition: object, pieceType: string, team: string, boardState: object) {
    if (pieceType === 'pawn') {
      const firstRow = (team === 'w' ? 1 : 6);
      const pawnDirection = (team === 'w' ? 1 : -1);

      //special case, first row moves twice
      if (newPosition.x === initialPosition.x && initialPosition.y === firstRow && newPosition.y - initialPosition.y === (2 * pawnDirection)) {
        if (!this.tileIsOccupied(newPosition.x, newPosition.y, boardState) &&
            !this.tileIsOccupied(newPosition.x, newPosition.y - pawnDirection, boardState)) {
          return true;
        }
      //normal move cases
      } else if (newPosition.x === initialPosition.x && newPosition.y - initialPosition.y === pawnDirection) {
        if (!this.tileIsOccupied(newPosition.x, newPosition.y, boardState)) {
          return true;
        }
      //attack logic
      } else if ((initialPosition.x - 1 === newPosition.x || initialPosition.x + 1 === newPosition.x) &&
                  newPosition.y - initialPosition.y === pawnDirection &&
                  this.tileIsOccupiedByOpponent(newPosition.x, newPosition.y, boardState, team)) {
          return true;
      }
    }

    return false;
  }
}