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



describe("Create two different games and win one while losing the other", () => {
    before(() => {
        socketMansion(server, modules);
        server.listen(3000);
    });

    after((done) => {
        server.close();
        done();
    });

    it('Should close the connections on win event since we won', (done) => {
        const testFunc = (client1, client2) => (done) => {
            client2.on('start room1', () => {
                client1.emit('attack room1', 500);

                client1.on('win room1', () => {
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

    it('should lose the game since we cheat lose', (done) => {
        const testFunc = (client1, client2) => (done) => {
            client2.on('start room2', () => {
                client1.emit('cheat lose room2');

                client1.emit('boss attack room2');

                client1.on('boss attack room2', (obj) => {
                    assert.equal(false, obj.nextPlayer);
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
            room: 'room2',
            module: 'game'
        });
    });
});
