import StatusBadge from './StatusBadge';
import './player.scss';

export default function PlayerCard({ player }) {
    console.log("PlayerCard", player);
    return (
      <>
        <div className="player">
          <div className="avatar"><img src={`/src/assets/img/avatar/${player.name}.jpg`} alt="" /></div>
          <div className="name">[{player.role}]{player.name}</div>
          <div className="badge-container"><StatusBadge status="ready" /></div>
        </div>
      </>
    )
}
