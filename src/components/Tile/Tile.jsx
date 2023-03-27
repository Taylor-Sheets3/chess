import './Tile.css';

export default function Tile ({ number, image, highlight }) {
  const className = [
    'tile',
    number % 2 === 0 && 'black-tile',
    number % 2 !== 0 && 'white-tile',
    highlight && 'tile-highlight'
  ].filter(Boolean).join(' ');

  // console.log(className);
  return (
    <div className={className}>
      {image && <div style={{backgroundImage: `url(${image})`}} className='chessPiece'></div>}
    </div>
  )
}