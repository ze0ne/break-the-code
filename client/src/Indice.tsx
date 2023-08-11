import "./Indice.scss";
import { socket } from "./socket";
import { getIndice } from "./utils";

export default function Indice({ indice }) {
  const test = getIndice(indice);

  const handleClick = () => {
    //console.log("oooo click", indice);
    socket.emit("indice", indice);
  }

  return (
    <>
      <div className="indice" onClick={handleClick}>
        <div className="content">
          <h1>{test}</h1>
        </div>
      </div>
    </>
  );
}
