// // For testing suite
// /*eslint-disable no-unused-vars*/
// var assert   = require("assert");
// var mocha    = require('mocha');
// var it       = mocha.it;
// var describe = mocha.describe;
// var before   = mocha.before;
// var after    = mocha.after;
// /*eslint-enable no-unused-vars*/
//
// // Create a server
// var app    = require('express')();
// var http   = require('http');
// var server = http.createServer(app);
//
// // socket.io and socket-container module
// var io        = require('socket.io-client');
// const game    = require('../../backend/src/game.js').game;
// const socketMansion = require('socket-mansion');
// const setupRoomTest = require('socket-mansion').setupRoomTest;
//
// // Will be used as parameter for socketMansion
// const modules = [{module: game, name: "game"}];
//
//
// var socketURL = 'http://localhost:3000';
// var options = {
//     transports: ['websocket'],
//     'force new connection': true
// };
//
//
//
// describe("Try out basic game actions with the socket-mansion", () => {
//     before(() => {
//         socketMansion(server, modules);
//         server.listen(3000);
//     });
//
//     after((done) => {
//         server.close();
//         done();
//     });
//
//     it('should create game room and greet user', (done) => {
//         var socket = io(socketURL, options);
//
//
//         socket.on('connect', () => {
//             socket.emit('setup user', {name: "nicklas"});
//             socket.emit('create room', 'room1', 'game');
//             socket.emit('join room', 'room1');
//
//             assert.equal(true, socket.connected);
//         });
//
//         socket.on('new room1', (text) => {
//             assert.equal(text, 'nicklas joined the game');
//             socket.disconnect();
//             done();
//         });
//     });
//
//
//     it('Should start as healers turn then heal warrior 30 hp', (done) => {
//         const testFunc = (client1, client2) => (done) => {
//             client2.on('start room2', (obj) => {
//                 assert.equal(obj.players[0].name, 'player1');
//                 assert.equal(obj.players[1].name, 'player2');
//                 assert.equal(obj.playerTurn, 'player1');
//
//                 client1.emit('heal room2', 'player2');
//
//                 client2.on('heal room2', (obj) => {
//                     console.log(obj);
//                     assert.equal(obj.updatedPlayer.name, 'player2');
//                     assert.equal(obj.updatedPlayer.hp, 280);
//                     client1.disconnect();
//                     client2.disconnect();
//                     done();
//                 });
//             });
//         };
//
//         setupRoomTest({
//             socketURL: socketURL,
//             options: options,
//             func: testFunc,
//             done: done,
//             room: 'room2',
//             module: 'game'
//         });
//     });
//
//     it('should attack the boss with 50 dmg and return boss obj with 450 hp', (done) => {
//         const testFunc = (client1, client2) => (done) => {
//             client2.on('start room3', (obj) => {
//                 assert.equal(obj.players[0].name, 'player1');
//                 assert.equal(obj.players[1].name, 'player2');
//                 assert.equal(obj.playerTurn, 'player1');
//
//                 client1.emit('attack room3');
//
//                 client2.on('attack room3', (obj) => {
//                     assert.equal(obj.boss.hp, 450);
//                     assert.equal(obj.boss.name, 'Orc');
//                     console.log(obj);
//                     assert.equal(obj.nextPlayer, 'player2');
//                     client1.disconnect();
//                     client2.disconnect();
//                     done();
//                 });
//             });
//         };
//
//         setupRoomTest({
//             socketURL: socketURL,
//             options: options,
//             func: testFunc,
//             done: done,
//             room: 'room3',
//             module: 'game'
//         });
//     });
// });
