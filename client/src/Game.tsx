import { useState, useEffect } from "react";
import Tile from "./Tile";
import Cards from "./Cards";
import { socket } from "./socket";
import Indice from "./Indice";
import "./App.scss";
import { getIndice } from "./utils";

function Question(question) {
  console.log("question", question)
  if(question) {
    return question.value;
  } else {
    return "apa";
  }
}

function Game() {
  const [cards, setCards] = useState([]);
  const [indices, setIndices] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  //const [playerJoin, setPlayerJoin] = useState([]);


  useEffect(() => {
    function onStartGame(value) {
      console.log("on start game");
      //console.log("indices", value);
      ////const cards = value.cards.map((card, index) =>
      ////  <Tile key={index} number={card.number} color={card.color}></Tile>
      ////);
      //const cards = value.cards;
      //const indices = value.indices.map((indice, index) => (
      //  <Indice key={index} indice={indice} />
      //));
    
      // setIndices(indices);
      // setCards(cards);
    }

    function onCurrentQuestion(value) {
      console.log("currentQuestison", value);
      setCurrentQuestion(getIndice(value));
    }

    socket.on("start_game", onStartGame);
    socket.on("currentQuestison", onCurrentQuestion);
  }, []);

  return (
    <>
      <h1>Indice  test<Question value={currentQuestion} /></h1>
      {cards.map((obj, index) => (
          <Tile key={index} index={index} color={obj.color} number={obj.number}/>
      ))}
      <div className="indices">{indices}</div>{" "}
    </>
  );
}

export default Game;
