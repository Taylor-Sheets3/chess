import './Chessboard.css';
import Tile from '../Tile/Tile';
import { useRef, useState } from 'react';
import Referee from '../../referee/Referee';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g',' h'];
//places pieces on the board in their default positions
const initialBoardState = [];
for (let p = 0; p < 2; p++) {
  const type = (p === 0) ? 'b' : 'w';
  const y = (p === 0) ? 7 : 0;

  initialBoardState.push({
    image:`assets/images/rook_${type}.png`,
    x: 0,
    y,
    type: 'rook',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/rook_${type}.png`,
    x: 7,
    y,
    type: 'rook',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/knight_${type}.png`,
    x: 1,
    y,
    type: 'knight',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/knight_${type}.png`,
    x: 6,
    y,
    type: 'knight',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/bishop_${type}.png`,
    x: 2,
    y,
    type: 'bishop',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/bishop_${type}.png`,
    x: 5,
    y,
    type: 'bishop',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/queen_${type}.png`,
    x: 3,
    y,
    type: 'queen',
    team: type
  })
  initialBoardState.push({
    image:`assets/images/king_${type}.png`,
    x: 4,
    y,
    type: 'king',
    team: type
  })
}

for (let i = 0; i < 8; i ++) {
  initialBoardState.push({
    image:'assets/images/pawn_b.png',
    x: i,
    y: 6,
    type: 'pawn',
    team: 'b'
  })
}

for (let i = 0; i < 8; i ++) {
  initialBoardState.push({
    image:'assets/images/pawn_w.png',
    x: i,
    y: 1,
    type: 'pawn',
    team: 'w'
  })
}

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState(null)
  const [gridX, setGridX] = useState(0);
  const[gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState(initialBoardState);
  //useRef allows the board to track game state as moves are made
  const chessboardRef = useRef(null)
  const referee = new Referee();

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
      //maintains x boundary
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
        //sets new x coordinate
      } else {
        activePiece.style.left = `${x}px`;
      }

      //maintains y boundary
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
        //sets new y coordinate
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
      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      //if the mouseup event is targeting a piece
      if (currentPiece) {
        const validMove = referee.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces)
        //checks if the move is valid.  attack validation is done in the referee component
        if (validMove) {
          //updates the board to reflect new piece position and any taken pieces
          //returns the current board state with the only modifications being:
          //  1. the moved piece updated position
          //  2. any taken pieces are removed from the board
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.x = x;
              piece.y = y;
              results.push(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              results.push(piece);
            }

            return results;
          }, []);

          setPieces(updatedPieces);
          //snap feature automatically adjusts piece to the center of the tile
        } else {
            activePiece.style.position = 'relative';
            activePiece.style.removeProperty('top');
            activePiece.style.removeProperty('left');
        }
      }
      setActivePiece(null);
    }
  }

  //controls board logic
  let board = [];
  for (let j = verticalAxis.length - 1; j >=0; j--) {
    for (let i = 0; i < horizontalAxis.length; i ++) {
      //an even or odd number that will determine if squares are black or white
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