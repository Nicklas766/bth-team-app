function game(io, id) {
    this.io = io;
    this.id = id;
    this.players = [];
    this.boss  = {name: "Orc", hp: 500};
    this.current = "";
}
// Man söker efter en grupp
// Cast healing on target
// game.prototype.chooseClass = function (socket) {
//     socket.on(`skill ${this.id}`, (skill) => {
//       const player = this.players.filter(player => player.id != socket.id)[0];
//     });
// }

// Find a target in an array and then updates it then return new array
const changePlayerHealth = (arr, target, amount) => {
    const targetPlayer = arr.find(player => player.name === target);

    targetPlayer.hp += amount;
    return arr.map(player => player.name === target ? targetPlayer : player);
};
// Cast healing on a target and then update in player array

game.prototype.heal = function (socket) {
    socket.on(`heal ${this.id}`, (target) => {
        const heal   = 30;

        this.players = changePlayerHealth(this.players, target, 30);

        // console.log("GOING TO HEAL:", target)
        // console.log("OBJECT TARGET IS :", targetPlayer);

        // Emit heal to client so it can update
        this.io.sockets.in(this.id).emit(`heal ${this.id}`, target, heal);
    });
};


// Return new player array
const bossAttack = (arr, io, id) => {
    // io.sockets.in(this.id).emit(`current ${this.id}`, 'boss');

    const dmg = randomInt(-20, -50);
    // target is randomly chosen from array
    const target = arr[randomInt(0, 1)].name;

    const targetPlayer = arr.find(player => player.name === target);

    console.log(dmg);
    console.log(arr);

    io.sockets.in(id).emit(`boss attack ${id}`, target, dmg);

    return changePlayerHealth(arr, target, dmg);
};


// Attacks the boss
game.prototype.attack = function (socket) {
    socket.on(`attack ${this.id}`, (attack = null) => {
        let dmg = 50;

        // Use sent in attack instead
        if (attack) {
            dmg = attack;
        }

        this.boss.hp -= dmg;

        // End game if zero or below
        if (this.boss.hp <= 0) {
            console.log('Players won!');
        }
        // Emits boss hp and dmg took, to the client
        this.io.sockets.in(this.id).emit(`attack ${this.id}`, this.boss.hp, dmg);

        // start the boss attack
        this.players = bossAttack(this.players, this.io, this.id);
        console.log(this.players);
    });
};

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
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
    // if (this.players.length == 2) {
    //     // this.io.sockets.in(this.id).emit(`start ${this.id}`);
    //     // random first
    // }

    this.heal(socket);
    this.attack(socket);
};


game.prototype.off = function (socket) {
    // Remove events for socket
    // socket.removeAllListeners(`attack ${this.id}`);
    // socket.removeAllListeners(`heal ${this.id}`);
    // console.log('im disconnected');
};

module.exports = { game };
