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
var io        = require('socket.io-client');
const game    = require('../../src/game.js').game;
const socketMansion = require('socket-mansion');

// test setup for socket-mansion rooms
const setupRoomTest = require('./setup.js').setupRoomTest;

// Will be used as parameter for socketMansion
const modules = [{module: game, name: "game"}];


var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};



describe("Try out basic game actions with the socket-mansion", () => {
    before(() => {
        socketMansion(server, modules);
        server.listen(3000);
    });

    after((done) => {
        server.close();
        done();
    });

    it('should create game room and greet user', (done) => {
        var socket = io(socketURL, options);


        socket.on('connect', () => {
            socket.emit('setup user', {name: "nicklas"});
            socket.emit('create room', 'room1', 'game');
            socket.emit('join room', 'room1');

            assert.equal(true, socket.connected);
        });

        socket.on('new room1', (text) => {
            assert.equal(text, 'nicklas joined the game');
            socket.disconnect();
            done();
        });
    });


    it('Should start as healers turn then heal warrior 30 hp', (done) => {
        const testFunc = (client1, client2) => (done) => {
            client2.on('start room2', (playerName) => {
                assert.equal(playerName, 'healer');

                client1.emit('heal room2', 'warrior');

                client2.on('heal room2', (target, heal) => {
                    assert.equal(target, 'warrior');
                    assert.equal(heal, 30);
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
            room: 'room2'
        });
    });

    it('should attack the boss with 50 dmg and return 450 hp', (done) => {
        const testFunc = (client1, client2) => (done) => {
            client2.on('start room3', (playerName) => {
                assert.equal(playerName, 'healer');

                client1.emit('attack room3');

                client2.on('attack room3', (bossHealth, dmg) => {
                    assert.equal(bossHealth, 450);
                    assert.equal(dmg, 50);
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
            room: 'room3'
        });
    });
});
