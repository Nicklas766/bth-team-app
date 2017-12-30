/**
* Finds a player in an array and then updates health of player
* @param {array} arr
* @param {string} target
* @param {integer} amount
*
* @return {arr}
*/
const changePlayerHealth = (arr, target, amount) => {
    const targetPlayer = arr.find(player => player.name === target);

    targetPlayer.hp += amount;
    return arr.map(player => player.name === target ? targetPlayer : player);
};

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};


/******************************************************************************
** Room object below
******************************************************************************/

function game(io, id) {
    this.io = io;
    this.id = id;
    this.players = [];
    this.boss    = {name: "Orc", hp: 500};
}

// Cast healing on a target and then update in player array
game.prototype.heal = function (socket) {
    socket.on(`heal ${this.id}`, (target) => {
        const heal   = 30;

        this.players = changePlayerHealth(this.players, target, 30);
        // Emit heal to client so it can update
        this.io.sockets.in(this.id).emit(`heal ${this.id}`, target, heal);
    });
};

/**
* Attacks the boss and returns data to clients, if boss hp 0 or lower then
* players win
*/
game.prototype.attack = function (socket) {
    socket.on(`attack ${this.id}`, (attack = null) => {
        // damage
        let dmg = 50;

        if (attack) {
            dmg = attack;
        }
        this.boss.hp -= dmg;

        // End game if zero or below
        if (this.boss.hp <= 0) {
            this.io.sockets.in(this.id).emit(`end ${this.id}`, 'win');
        }

        // Emits boss hp and dmg took, to the client
        this.io.sockets.in(this.id).emit(`attack ${this.id}`, this.boss.hp, dmg);
    });
};


/**
* Boss attacks player and emits {target, dmg, nextPlayer}
* it also updates the this.players so the health is correct
*/
game.prototype.bossAttack = function (socket) {
    socket.on(`boss attack ${this.id}`, () => {
        // Build dmg, find target.
        const dmg          = randomInt(-20, -50);
        const target       = arr[randomInt(0, 1)].name;
        const targetPlayer = arr.find(player => player.name === target);

        // Update player array, so health is correct
        this.players = changePlayerHealth(this.players, target, dmg);

        // Find out who's the next player, or false which equals loss of game
        const otherPlayer = this.players.filter(player => player.id !== socket.id)[0];
        const currPlayer  = this.players.find(player => player.id === socket.id);
        const nextPlayer  = otherPlayer.hp > 0 ? otherPlayer.name : (currPlayer.hp > 0 ? currPlayer.name : false);

        // Emit which target, dmg and who's next turn it is.
        io.sockets.in(id).emit(`boss attack ${id}`, {target, dmg, nextPlayer});
    });
};




// Cheat by making players lose
game.prototype.cheat = function (socket) {
    socket.on(`cheat lose ${this.id}`, () => {
        console.log("----------------------------------------------------------------------------------LETS CHEAT!!!");
        this.players[0].hp = 0;
        this.players[1].hp = 0;
        console.log(`----------------------------------------------------------------------------------next turn ${this.id}`);
    });
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

    // Setup events for socket
    this.heal(socket);
    this.attack(socket);
    this.bossAttack(socket);
    this.cheat(socket);

    // Start game if we have two players, send players name who starts
    if (this.players.length == 2) {
        this.io.sockets.in(this.id).emit(`start ${this.id}`, this.players[0].name);
    }
};


game.prototype.off = function (socket) {
    // Remove from array
    socket.removeAllListeners(`attack ${this.id}`);
    socket.removeAllListeners(`heal ${this.id}`);
    socket.removeAllListeners(`boss attack ${this.id}`);
    // console.log('im disconnected');
};

module.exports = { game };
