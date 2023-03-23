export const VERTICAL_AXIS = ['1', '2', '3', '4', '5', '6', '7', '8'];
export const HORIZONTAL_AXIS = ['a', 'b', 'c', 'd', 'e', 'f', 'g',' h'];

export const GRID_SIZE = 100;
export const BOARD_SIZE = 800;

export function samePosition(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

//places pieces on the board in their default positions
export const initialBoardState = [];
for (let p = 0; p < 2; p++) {
  const type = (p === 0) ? 'b' : 'w';
  const y = (p === 0) ? 7 : 0;

  initialBoardState.push({
    image:`assets/images/rook_${type}.png`,
    position: {
      x: 0,
      y,
    },
    type: 'rook',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/rook_${type}.png`,
    position: {
      x: 7,
      y,
    },
    type: 'rook',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/knight_${type}.png`,
    position: {
      x: 1,
      y,
    },
    type: 'knight',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/knight_${type}.png`,
    position: {
      x: 6,
      y,
    },
    type: 'knight',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/bishop_${type}.png`,
    position: {
      x: 2,
      y,
    },
    type: 'bishop',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/bishop_${type}.png`,
    position: {
      x: 5,
      y,
    },
    type: 'bishop',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/queen_${type}.png`,
    position: {
      x: 3,
      y,
    },
    type: 'queen',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/king_${type}.png`,
    position: {
      x: 4,
      y,
    },
    type: 'king',
    team: type
  })
}

for (let i = 0; i < 8; i ++) {
  initialBoardState.push({
    image:'assets/images/pawn_b.png',
    position: {
      x: i,
      y: 6,
    },
    type: 'pawn',
    team: 'b',
    enPassant: false,
  })
}

for (let i = 0; i < 8; i ++) {
  initialBoardState.push({
    image:'assets/images/pawn_w.png',
    position: {
      x: i,
      y: 1,
    },
    type: 'pawn',
    team: 'w',
    enPassant: false,
  })
}