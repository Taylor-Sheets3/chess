import './Chessboard.css';
import Tile from '../Tile/Tile';
import { useRef, useState, useEffect } from 'react';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g',' h'];
//places pieces on the board in their default positions
const initialBoardState = [];
for (let p = 0; p < 2; p++) {
  const type = (p === 0) ? 'b' : 'w';
  const y = (p === 0) ? 7 : 0;

  initialBoardState.push({ image:`assets/images/rook_${type}.png`, x: 0, y})
  initialBoardState.push({ image:`assets/images/rook_${type}.png`, x: 7, y})
  initialBoardState.push({ image:`assets/images/knight_${type}.png`, x: 1, y})
  initialBoardState.push({ image:`assets/images/knight_${type}.png`, x: 6, y})
  initialBoardState.push({ image:`assets/images/bishop_${type}.png`, x: 2, y})
  initialBoardState.push({ image:`assets/images/bishop_${type}.png`, x: 5, y})
  initialBoardState.push({ image:`assets/images/queen_${type}.png`, x: 3, y})
  initialBoardState.push({ image:`assets/images/king_${type}.png`, x: 4, y})
}

for (let i = 0; i < 8; i ++) {
  initialBoardState.push({ image:'assets/images/pawn_b.png', x: i, y: 6 })
}

for (let i = 0; i < 8; i ++) {
  initialBoardState.push({ image:'assets/images/pawn_w.png', x: i, y: 1 })
}



export default function Chessboard() {
  const [activePiece, setActivePiece] = useState(null)
  const [gridX, setGridX] = useState(0);
  const[gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState(initialBoardState);
  const chessboardRef = useRef(null)

  //controls piece movement
  function grabPiece(e: React.MouseEvent) {
    const element = e.target;
    const chessboard = chessboardRef.current;

    if (element.classList.contains('chessPiece') && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = 'absolute';
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {

      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientWidth - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      activePiece.style.position = 'absolute';

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
      console.log(x, y)
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      })
      setActivePiece(null);
    }
  }

  //controls board logic
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
      ref={chessboardRef}
    >
      {board}
    </div>
  )
}