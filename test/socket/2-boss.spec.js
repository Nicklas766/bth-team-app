// For testing suite
/*eslint-disable no-unused-vars*/
var assert   = require("assert");
var mocha    = require('mocha');
var it       = mocha.it;
var describe = mocha.describe;
var before   = mocha.before;
var after    = mocha.after;
/*eslint-enable no-unused-vars*/

// Create a server
var app    = require('express')();
var http   = require('http');
var server = http.createServer(app);

// socket.io and socket-container module
const game    = require('../../src/game.js').game;
const socketMansion = require('socket-mansion');
const setupRoomTest = require('socket-mansion').setupRoomTest;

// Will be used as parameter for socketMansion
const modules = [{module: game, name: "game"}];


var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};



describe("Try out the boss of the game with the socket-mansion", () => {
    before(() => {
        socketMansion(server, modules);
        server.listen(3000);
    });

    after((done) => {
        server.close();
        done();
    });

    it('should attack boss, then boss attacks -20 > dmg > -50, then whos next', (done) => {
        const testFunc = (client1, client2) => (done) => {
            client2.on('start room1', () => {
                client1.emit('attack room1');

                client1.emit('boss attack room1');

                client2.on('boss attack room1', (obj) => {
                    assert.equal(true, ['player1', 'player2'].includes(obj.nextPlayer));

                    // We can find out damage with subtract and the original hp
                    const dmg = obj.updatedPlayer.hp - 250;

                    assert.equal(true, (dmg < -20 && dmg > -50));

                    client1.disconnect();
                    client2.disconnect();
                    done();
                });
            });
        };

        setupRoomTest({
            socketURL: socketURL,
            options: options,
            func: testFunc,
            done: done,
            room: 'room1',
            module: 'game'
        });
    });
});
