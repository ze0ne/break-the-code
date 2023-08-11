import { createServer } from "http";
import { Server } from "socket.io";
import Room from "./src/Room.js";
import Player from "./src/Player.js";
import Game from "./src/Game.js";


const indices = ['ODD_TILE_COUNT', 'EVEN_TILE_COUNT', 'SAME_NUMBER_TILE_COUNT', 'BLACK_NUMBER_TILE_COUNT', 'WHITE_NUMBER_TILE_COUNT', 'TILE_C_GREATER_THAN_4', 'NUMBER_RANGE_DIFFERENCE', 'SUM_OF_BLACK_NUMBERS', 'SUM_OF_WHITE_NUMBERS', 'SUM_OF_LEFTMOST_3_TILES', 'SUM_OF_RIGHTMOST_3_TILES', 'SUM_OF_CENTRAL_TILES_BCD', 'SUM_OF_CENTRAL_TILES_BC', 'SUM_OF_TILES', 'LOCATION_OF_0_TILES', 'LOCATION_OF_1_2_TILES', 'LOCATION_OF_3_4_TILES', 'LOCATION_OF_5_TILES', 'LOCATION_OF_6_7_TILES', 'LOCATION_OF_8_9_TILES', 'SAME_COLOR_NEIGHBORING_TILES', 'CONSECUTIVE_NUMBER_NEIGHBORING_TILES']

const pioches = melangeDeck(indices);

const indicesVisibles = pioches.slice(0, 6);
console.log(indicesVisibles);


function orderCards(cards) {
  return cards.sort((a, b) => a.number - b.number);;
}

function melangeDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}

const colors = ["white", "black"];
let deck = colors.flatMap((color) => {
  return Array.from({ length: 10 }, (_, i) => {
    return { number: i, color: i === 5 ? "green" : color };
  });
});

let cards = melangeDeck(deck);

const players = ['John', 'Jane', 'Mike', 'Sarah', 'Bot'];

let distribution = [];

players.forEach((player, index) => {
  let start = 0;
  let end = 4;
  if (index > 0) {
    start = index * 4;
    end = start + 4;
  }
  const distrib = cards.slice(start, end);
  distribution.push(orderCards(distrib));
});

//console.log("distrib", distribution);


const httpServer = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
  
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}
});

const io = new Server(httpServer, {
  cors: {
    origin: "https://5173-ze0ne-breakthecode-95i4u88na2q.ws-eu102.gitpod.io",
  }
});
const game = new Game();

// server-side
io.on("connection", (socket) => {


  console.log("Connect");
  socket.emit("toto", "test");


  const connectedClients = Object.keys(io.sockets.sockets);
  console.log('Clients connectés actuellement :', connectedClients);

  console.log('Nombre de clients connectés :', io.engine.clientsCount);
  
  //socket.emit('current_players', room.getPlayers());

  socket.on('new_room', () => {
    const room = new Room();    
    const id = room.getId();
    game.setRoom(room);
    socket.join(id);
    socket.emit('join_room', room);
    console.log('New room', id);
  })

  socket.on('join_room', roomName => {
    console.log('New client join room', roomName);
    const room = game.getRoom(roomName);
    console.log("rrroom", room);
    if(!room) {
      socket.emit('room_does_not_exist');
    } else {
      socket.join(roomName);
      socket.emit('join_room', room);
      socket.emit('players', room.getPlayers());
    }
  }); 

  socket.on('new_player', value => {
    let role = 'player';
    console.log('new player', value);
    const room = game.getRoom(value.room);
    const players = room.getPlayers();
    if(players.length === 0) role = 'host';
    const player = new Player(value.name, role);
    room.setPlayer(player);
    // console.log("players", room.getPlayers());
    io.to(value.room).emit('players', room.getPlayers());
  })

  socket.on('start_game', (value) => {
    const room = game.getRoom(value);
    io.to(value).emit('start_game', room);
  })

  


  // console.log("socket", socket);
  //socket.emit("startGame", {cards: distribution[0], indices: indicesVisibles});
  socket.on('indice', value => {
    console.log("indice", value)
    //socket.emit('currentQuestison', value);
  })

 

});


httpServer.listen(3000);