export default class Room {

    constructor() {
        this.id = this.generateId();
        this.players = [];
    }

    generateId() {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    }

    getId() {
        return this.id;
    }

    setPlayer(player) {
        this.players.push(player);
    }

    getPlayers() {
        return this.players;
    }

}