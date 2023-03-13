import './Chessboard.css'
import Tile from '../Tile/Tile'

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g',' h'];

const pieces = [];

for (let p = 0; p < 2; p++) {
  const type = (p === 0) ? 'b' : 'w';
  const y = (p === 0) ? 7 : 0;

  pieces.push({ image:`assets/images/rook_${type}.png`, x: 0, y})
  pieces.push({ image:`assets/images/rook_${type}.png`, x: 7, y})
  pieces.push({ image:`assets/images/knight_${type}.png`, x: 1, y})
  pieces.push({ image:`assets/images/knight_${type}.png`, x: 6, y})
  pieces.push({ image:`assets/images/bishop_${type}.png`, x: 2, y})
  pieces.push({ image:`assets/images/bishop_${type}.png`, x: 5, y})
  pieces.push({ image:`assets/images/queen_${type}.png`, x: 3, y})
  pieces.push({ image:`assets/images/king_${type}.png`, x: 4, y})
}

for (let i = 0; i < 8; i ++) {
  pieces.push({ image:'assets/images/pawn_b.png', x: i, y: 6 })
}

for (let i = 0; i < 8; i ++) {
  pieces.push({ image:'assets/images/pawn_w.png', x: i, y: 1 })
}

let activePiece = null;

function grabPiece(e: React.MouseEvent) {
  const element = e.target;

  if (element.classList.contains('chessPiece')) {
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    element.style.position = 'absolute';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    activePiece = element;
  }
}

function movePiece(e: React.MouseEvent) {
  if (activePiece) {
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    activePiece.style.position = 'absolute';
    activePiece.style.left = `${x}px`;
    activePiece.style.top = `${y}px`;
  }
}

function dropPiece(e: React.MouseEvent) {
  if (activePiece) {
    activePiece = null;
  }
}

export default function Chessboard() {
  let board = [];

  for (let j = verticalAxis.length - 1; j >=0; j--) {
    for (let i = 0; i < horizontalAxis.length; i ++) {
      const number = i + j + 2;
      let image = null;

      pieces.forEach(piece => {
        if (piece.x === i && piece.y === j) {
          image = piece.image;
        }
      })

      board.push(<Tile key={`${i},${j}`} image={image} number={number}/>)
    }
  }

  return (
    <div
      onMouseMove={e => movePiece(e)}
      onMouseDown={e => grabPiece(e)}
      onMouseUp={e => dropPiece(e)}
      id='chessboard'
    >
      {board}
    </div>
  )
}