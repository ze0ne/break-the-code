export default class Game {

    rooms = [];

    setRoom(room) {
       this.rooms.push(room);
    }

    getRooms() {
        return this.rooms
    }

    getRoom(id) {
        return this.rooms.find(room => room.id === id);
    }  
    
 
}