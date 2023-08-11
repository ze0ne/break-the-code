import { useEffect, useState } from 'react';
import './Tile.scss';

export default function Tile({ index, number, color }) {
  const [afficherComposant, setAfficherComposant] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAfficherComposant(true);
    }, 3000+(index*1000));
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className={`card ${afficherComposant ? "active" : ""}`}>
          <div className="card-front"></div>
          <div className="card-back">
            <div className="cover"></div>
            <div className={`number ${color}`}>{number}</div>
          </div>
        </div>
      </div>

    </>
  );
}
