function game(io, id) {
    this.io = io;
    this.id = id;
    this.players = []
}

game.prototype.setup = function (socket, userObj) {
    // Add new player
    const newPlayer = {name: userObj.user.name, id: socket.id};
    this.players = this.players.concat(newPlayer);

    // Inform all in room that new user joined
    this.io.sockets.in(this.id).emit(`new ${this.id}`, `${newPlayer.name} joined the game!`);

    // if (user full) {
    //     start
    // }
}

game.prototype.off = function (socket) {
    socket.off(`my event`);
}

module.exports = { game };
