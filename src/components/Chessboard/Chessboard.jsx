import './Chessboard.css';
import Tile from '../Tile/Tile';
import { useRef, useState } from 'react';
import Referee from '../../referee/Referee';
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  initialBoardState,
  GRID_SIZE,
  BOARD_SIZE,
  samePosition
} from '../../Constants'

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState(null);
  const [grabPosition, setGrabPosition] = useState(null);
  const [pieces, setPieces] = useState(initialBoardState);
  const [promotionPawn, setPromotionPawn] = useState();
  //useRef allows the board to track game state as moves are made
  const chessboardRef = useRef(null)
  const modalRef = useRef(null);
  const referee = new Referee();

  function updateValidMoves() {
    setPieces((pieces) => {
      return pieces.map(p => {
        p.possibleMoves = referee.getValidMoves(p, pieces);
        return p;
      });
    })
  }

  //controls piece movement
  function grabPiece(e: React.MouseEvent) {
    updateValidMoves();

    const element = e.target;
    const chessboard = chessboardRef.current;

    if (element.classList.contains('chessPiece') && chessboard) {
      setGrabPosition({
        x: Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE),
        y: Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - BOARD_SIZE) / GRID_SIZE))
      })
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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
      const newPosition = {
        x : Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE),
        y : Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - BOARD_SIZE) / GRID_SIZE)),
      }
      const currentPiece = pieces.find(p => samePosition(p.position, grabPosition));
      //if the mouseup event is targeting a piece
      if (currentPiece) {
        const validMove = referee.isValidMove(grabPosition, newPosition, currentPiece.type, currentPiece.team, pieces)

        const isEnPassantMove = referee.isEnPassantMove(grabPosition, newPosition, currentPiece.type, currentPiece.team, pieces);

        if (isEnPassantMove) {
          const pawnDirection = currentPiece.team === 'w' ? 1 : -1;
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false;
              piece.position.x = newPosition.x;
              piece.position.y = newPosition.y;
              results.push(piece);
            } else if (!(samePosition(piece.position, {x: newPosition.x, y: newPosition.y - pawnDirection}))) {
              if (piece.type === 'pawn'){
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, [])

          setPieces(updatedPieces);
        } else if (validMove) {
          //updates the board to reflect new piece position and any taken pieces
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant =
                Math.abs(grabPosition.y - newPosition.y) === 2 &&
                piece.type === 'pawn';

              piece.position.x = newPosition.x;
              piece.position.y = newPosition.y;

              const promotionRow = (piece.team === 'w') ? 7 : 0;
              if (newPosition.y === promotionRow && piece.type === 'pawn') {
                modalRef.current.classList.remove('hidden')
                setPromotionPawn(piece);
              }
              results.push(piece);
            } else if (!(samePosition(piece.position, {x: newPosition.x, y: newPosition.y}))) {
              if (piece.type === 'pawn') {
                piece.enPassant = false;
              }
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

  function promotePawn(pieceType) {
    if(promotionPawn) {
      const updatedPieces = pieces.reduce((results, piece) => {
        if(samePosition(piece.position, promotionPawn.position)) {
          piece.image = `assets/images/${pieceType}_${piece.team}.png`
          piece.type = pieceType;
        }
        console.log(piece.image)
        results.push(piece);

        return results;
      }, [])

      setPieces(updatedPieces);

      modalRef.current.classList.add('hidden');
    }
  }

  function promotionTeamType() {
    if (promotionPawn) {
      return promotionPawn.team;
    }
  }

  //controls board logic
  let board = [];
  for (let j = VERTICAL_AXIS.length - 1; j >=0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i ++) {
      //an even or odd number that will determine if squares are black or white
      const number = i + j + 2;
      const piece = pieces.find(p => samePosition(p.position, {x: i, y: j}));
      let image = piece ? piece.image : null;

      board.push(<Tile key={`${i},${j}`} image={image} number={number} />)
    }
  }

  return (
    <>
      <div id='pawn-promotion-modal' className='hidden' ref={modalRef}>
        <div className='modal-body'>
          <img onClick={() => promotePawn('knight')} src={`assets/images/knight_${promotionTeamType()}.png`} alt='rook'/>
          <img onClick={() => promotePawn('bishop')} src={`assets/images/bishop_${promotionTeamType()}.png`} alt='rook'/>
          <img onClick={() => promotePawn('rook')} src={`assets/images/rook_${promotionTeamType()}.png`} alt='rook'/>
          <img onClick={() => promotePawn('queen')} src={`assets/images/queen_${promotionTeamType()}.png`} alt='rook'/>
        </div>
      </div>
      <div
        onMouseMove={e => movePiece(e)}
        onMouseDown={e => grabPiece(e)}
        onMouseUp={e => dropPiece(e)}
        id='chessboard'
        ref={chessboardRef}
      >
        {board}
      </div>
    </>
  )
}