import './Tile.scss';
import Tile from './Tile';

export default function Cards({ cards }) {
    console.log("cardzz", cards);
    const tiles = cards.map((card, index) =>
        <Tile key={index} index="1" number={card.number} color={card.color}></Tile>
    );
  return (
    <>
      {tiles}
    </>
  );
}
