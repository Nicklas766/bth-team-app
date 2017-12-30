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



describe("Create two different games and win one while losing the other", () => {
    before(() => {
        socketMansion(server, modules);
        server.listen(3000);
    });

    after((done) => {
        server.close();
        done();
    });

    it('should create game room with two users, heal warrior 30', (done) => {
        var client1 = io(socketURL, options);

        client1.on('connect', () => {
            var client2  = io(socketURL, options);

            client2.on('connect', () => {
                client1.emit('setup user', {name: "healer"});
                client2.emit('setup user', {name: "warrior"});

                client1.emit('create room', 'room1', 'game');

                client1.emit('join room', 'room1');
                client2.emit('join room', 'room1');

                // We use a third client only so we are sure we've joined room for
                // both client1 and client2.
                var client3 = io(socketURL, options);

                client3.on('connect', () => {
                    client1.emit('attack room1');

                    // Control so that the target is in arr and dmg correct interval (-20, -50)
                    client2.on('boss attack room1', (target, dmg) => {
                        assert.equal(true, ['warrior', 'healer'].includes(target));
                        assert.equal(true, (dmg < -20 && dmg > -50));
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
