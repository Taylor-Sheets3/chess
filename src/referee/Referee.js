import { pawnRules, knightRules, bishopRules, rookRules, kingRules, queenRules } from './rules';

export default class Referee {
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
      return pawnRules(initialPosition, newPosition, team, boardState);
    }
    if (pieceType === 'knight') {
      return knightRules(initialPosition, newPosition, team, boardState)
    }
    if (pieceType === 'bishop') {
      return bishopRules(initialPosition, newPosition, team, boardState)
    }
    if (pieceType === 'rook') {
      return rookRules(initialPosition, newPosition, team, boardState)
    }
    if (pieceType === 'king') {
      return kingRules(initialPosition, newPosition, team, boardState)
    }
    if (pieceType === 'queen') {
      return queenRules(initialPosition, newPosition, team, boardState)
    }

    return false;
  }
}