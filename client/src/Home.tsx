import { useEffect, useState } from "react";
import "./Home.scss";
import { socket } from "./socket.js";
import PlayerCard from "./PlayerCard.js";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';



function Home() {
  const [room, setRoom] = useState();
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState();
  const navigate = useNavigate();

  useEffect(() => {

    function onJoinRoom(room) {
      console.log("onJoinRoomonJoinRoom", room);
      setRoom(room)
    }

    function onPlayers(players) {
      console.log("OnPlayerz", players);
      setPlayers(players);
    }

    function onStartGame() {
      console.log(room);
      navigate('/game?id='+room.id);
    }

    socket.on("players", onPlayers);
    socket.on('current_players', onPlayers);
    socket.on('join_room', onJoinRoom)
    socket.on('start_game', onStartGame);

    socket.on('toto'), (e) => {
      console.log("toto", e);
    }
    

  }, []);

  socket.on('room_does_not_exist', () => {
    console.log("test");
    toast.error("Désolé cette room n'existe pas !")
  });

  function handleStartGame() {
    socket.emit('start_game', room.id);
  }

  function handleSubmitRoom(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    console.log("e", formData);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    const roomId = formJson.room as string;
    console.log("ROOM ID", roomId);
    socket.emit("join_room", roomId);
  }



  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    const playerName = formJson.player;
    console.log("playername", playerName);
    socket.emit("new_player", {room: room.id, name: playerName});
    setPlayer(playerName);
  }

  function createRoom(): void {
    socket.emit('new_room');
  }

  function IsInRoom() {
    console.log("isInRoom", )
    if(!room) {
      return <><div><button onClick={createRoom}>Create ROOM</button></div><form method="post" onSubmit={handleSubmitRoom}>
              <input type="text" name="room" placeholder="ROOM ID" />
              <br />
              <button type="submit">Submit ROOM</button>
            </form></>;
    } else if(room && !player) {
      return <><div className="content">
            <form method="post" onSubmit={handleSubmit}>
              <input type="text" name="player" placeholder="Player Name"/>
              <br />
              <button type="submit">Submit Player</button>
            </form>
          </div>
          
          <div className="players">
            <div className="room">{room.id}</div>
          {players.map((player, index) => (
            <PlayerCard key={index} player={player} />
          ))}
        </div></>; 
    } else {
        return <>          
          <div className="players">
            <div className="room">{room.id}</div>
          {players.map((player, index) => (
            <PlayerCard key={index} player={player} />
          ))}
        </div></>;
    }
  }

  function PlayersAreReady() {
    if(players.length > 1 && room && (players[0]['name'] === player)) {
      return <><button className="button start" onClick={handleStartGame}>START GAME</button></>
    }
    else if(player && room) {
      return <><h2>En attentes des joueurs</h2></>;
    }
  }


  return (
    <>
      <Toaster />
      <section className="home">
        <h1>Break the Code</h1>
        
        <IsInRoom></IsInRoom>
        <PlayersAreReady></PlayersAreReady>
        
        
        
      </section>
    </>
  );
}

export default Home;
