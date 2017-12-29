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

// Will be used as parameter for socketMansion
const modules = [{module: game, name: "game"}];


var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};



describe("Try out game with the socket-mansion", () => {
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


        socket.on('connect', (done) => {
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


    it('should create game room with two users, heal warrior 30', (done) => {
        var healer  = io(socketURL, options);
        var warrior = io(socketURL, options);


        warrior.on('connect', (done) => {
            // Setup user, room and join
            warrior.emit('setup user', {name: "warrior"});
            warrior.emit('create room', 'room2', 'game');
            warrior.emit('join room', 'room2');

            healer.on('connect', (done) => {
                // Setup user, join and heal
                healer.emit('setup user', {name: "healer"});
                healer.emit('join room', 'room2');
                // Heal in room2, warrior as target
                healer.emit('heal room2', 'warrior');
            });
        });

        warrior.on('heal room2', (target, heal) => {
            assert.equal(target, 'warrior');
            assert.equal(heal, 30);
            warrior.disconnect();
            healer.disconnect();
            done();
        });
    });
});
