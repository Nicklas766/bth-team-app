const getPlayer = (arr, name) => arr.filter(user => name == user.name)[0];

function game(io, id) {
    this.io = io;
    this.id = id;
    this.players = [];
    this.bosses  = [{name: "Orc", hp: 500}];
    this.current = "";
}
// Man söker efter en grupp
// Cast healing on target
// game.prototype.chooseClass = function (socket) {
//     socket.on(`skill ${this.id}`, (skill) => {
//       const player = this.players.filter(player => player.id != socket.id)[0];
//     });
// }

// Cast healing on target
game.prototype.heal = function (socket) {
    socket.on(`heal ${this.id}`, (target) => {
        const heal   = 30;
        const player = getPlayer(this.players, target);

        // Update player hp
        this.players = this.players.map((player) => {
            player.name == target ? Object.assign({hp: player.hp + heal}, player) : player;
        });

        // Emit heal to client so it can update
        this.io.sockets.in(this.id).emit(`heal ${this.id}`, target, heal);
    });
};

game.prototype.attack = function (socket) {
    socket.on(`attack ${this.id}`, () => {
        // Emit heal to client so it can update
        this.io.sockets.in(this.id).emit(`attack ${this.id}`, attack);
    });
};

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const bossAttack = (io) => {
    io.sockets.in(this.id).emit(`current ${this.id}`, 'boss');

    const dmg = randomInt(20, 50);
    // target is randomly chosen from array
    const target = this.players[randomInt(0, 1)].name;

    setTimeout(() => {
        io.sockets.in(this.id).emit(`attack ${this.id}`, target, dmg);
    }, 3000);
};


game.prototype.setup = function (socket, userObj) {
    // Add new player
    const newPlayer = {
        name: userObj.user.name,
        id: socket.id,
        hp: 250
    };

    this.players = this.players.concat(newPlayer);

    // Inform all in room that new user joined
    this.io.sockets.in(this.id).emit(`new ${this.id}`, `${newPlayer.name} joined the game`);

    // Start game if we have two players
    if (this.players.length == 2) {
        this.io.sockets.in(this.id).emit(`start ${this.id}`);
        // random first
    }

    this.heal(socket);
};


game.prototype.off = function (socket) {
    console.log('im disconnected')
};

module.exports = { game };
