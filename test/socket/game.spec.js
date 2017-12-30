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


    it('should create game room with two users, heal warrior 30', (done) => {
        var client1 = io(socketURL, options);

        client1.on('connect', () => {
            var client2  = io(socketURL, options);

            client2.on('connect', () => {
                client1.emit('setup user', {name: "healer"});
                client2.emit('setup user', {name: "warrior"});

                client1.emit('create room', 'room2', 'game');

                client1.emit('join room', 'room2');
                client2.emit('join room', 'room2');

                // We use a third client only so we are sure we've joined room for
                // both client1 and client2.
                var client3 = io(socketURL, options);

                client3.on('connect', () => {
                    client1.emit('heal room2', 'warrior');

                    client2.on('heal room2', (target, heal) => {
                        assert.equal(target, 'warrior');
                        assert.equal(heal, 30);
                        client1.disconnect();
                        client2.disconnect();
                        client3.disconnect();
                        done();
                    });
                });
            });
        });
    });

    it('should attack the boss with 50 dmg and return 450 hp', (done) => {
        var client1 = io(socketURL, options);

        client1.on('connect', () => {
            var client2  = io(socketURL, options);

            client2.on('connect', () => {
                client1.emit('setup user', {name: "healer"});
                client2.emit('setup user', {name: "warrior"});

                client1.emit('create room', 'room3', 'game');

                client1.emit('join room', 'room3');
                client2.emit('join room', 'room3');

                // We use a third client only so we are sure we've joined room for
                // both client1 and client2.
                var client3 = io(socketURL, options);

                client3.on('connect', () => {
                    client1.emit('attack room3');

                    client2.on('attack room3', (bossHealth, dmg) => {
                        assert.equal(bossHealth, 450);
                        assert.equal(dmg, 50);
                        client1.disconnect();
                        client2.disconnect();
                        client3.disconnect();
                        done();
                    });
                });
            });
        });
    });
});
