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

const getNextPlayer = (players, currentId) => {
    // Find out who's the next player, or false which equals loss of game
    const otherPlayer = players.filter(player => player.id !== currentId)[0];
    const currPlayer  = players.find(player => player.id === currentId);

    return otherPlayer.hp > 0 ? otherPlayer.name : (currPlayer.hp > 0 ? currPlayer.name : false);
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
        this.players = changePlayerHealth(this.players, target, 30);

        const updatedPlayer = this.players.find(player => player.name === target);

        // Find out who's the next player, or false which equals loss of game
        const nextPlayer = getNextPlayer(this.players, socket.id);

        // Emit heal to client so it can update
        this.io.sockets.in(this.id).emit(`heal ${this.id}`, {updatedPlayer, nextPlayer});
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
            this.io.sockets.in(this.id).emit(`win ${this.id}`);
            return;
        }

        // Find out who's the next player, or false which equals loss of game
        const nextPlayer = getNextPlayer(this.players, socket.id);

        // Emits boss hp and dmg took, to the client
        this.io.sockets.in(this.id).emit(`attack ${this.id}`, {boss: this.boss, nextPlayer});
    });
};


/**
* Boss attacks player and emits {target, dmg, nextPlayer}
* it also updates the this.players so the health is correct
*/
game.prototype.bossAttack = function (socket) {
    socket.on(`boss attack ${this.id}`, () => {

        // If false then we have no target
        if (!getNextPlayer(this.players, socket.id)) {
            return false;
        }

        // Build dmg and get random target
        const dmg         = randomInt(-20, -50);
        const randomIndex = randomInt(0, 2);

        // We use our random index to find user, then check if alive or not
        // Then based on that we either keep our first index or get other index
        const target       = this.players[randomIndex];
        const newIndex     = target.hp <= 0 ? (randomIndex > 0 ? 0 : 1) : randomIndex;
        const actualTarget = this.players[newIndex].name;

        // Update player array, so health is correct
        this.players = changePlayerHealth(this.players, actualTarget, dmg);

        const updatedPlayer = this.players.find(player => player.name === actualTarget);
        const nextPlayer    = getNextPlayer(this.players, socket.id);
        // Emit which target, dmg and who's next turn it is.
        this.io.sockets.in(this.id).emit(`boss attack ${this.id}`, {updatedPlayer, nextPlayer});
    });
};




// Cheat by making players lose
game.prototype.cheat = function (socket) {
    socket.on(`cheat lose ${this.id}`, () => {
        this.players[0].hp = 0;
        this.players[1].hp = 0;
    });

    // If user disconnects then let other player win
    socket.on(`disconnect`, () => {
        this.io.sockets.in(this.id).emit(`player disconnected ${this.id}`);
    });

    socket.on(`cheat player1 ${this.id}`, () => {
        this.players[0].hp = 0;
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
        const obj = {
            players: this.players,
            playerTurn: this.players[0].name,
            boss: this.boss
        };

        this.io.sockets.in(this.id).emit(`start ${this.id}`, obj);
    }
};


game.prototype.off = function (socket) {
    this.players = this.players.filter(player => player.id !== socket.id);
    console.log('he left', this.players)
    socket.removeAllListeners(`attack ${this.id}`);
    socket.removeAllListeners(`heal ${this.id}`);
    socket.removeAllListeners(`boss attack ${this.id}`);
    // console.log('im disconnected');
};

module.exports = { game };
