export default class Referee {
  isValidMove(previousX: number, previousY: number, newX: number, newY: number, pieceType: string, team: string) {
    if (pieceType === 'pawn') {
      if (team === 'w') {
        if (previousY === 1) {
          if (previousX === newX && (newY - previousY === 1 || newY - previousY === 2)) {
            return true;
          }
        } else {
          if (previousX === newX && newY - previousY === 1) {
            return true;
          }
        }
      }
    }

    return false;
  }
}