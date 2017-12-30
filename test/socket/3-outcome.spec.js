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
// const game    = require('../../src/game.js').game;
// const socketMansion = require('socket-mansion');
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
// describe("Create two different games and win one while losing the other", () => {
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
//     it('should receive start since two players join and then receive win', (done) => {
//         var client1 = io(socketURL, options);
//
//         client1.on('connect', () => {
//             var client2  = io(socketURL, options);
//
//             client2.on('connect', () => {
//                 client1.emit('setup user', {name: "healer"});
//                 client2.emit('setup user', {name: "warrior"});
//
//                 client1.emit('create room', 'room1', 'game');
//
//                 client1.emit('join room', 'room1');
//                 client2.emit('join room', 'room1');
//
//                 // Control so that the target is in arr and dmg correct interval (-20, -50)
//                 client2.on('start room1', () => {
//                     client2.on('next turn room1', (user) => {
//                         assert.equal(user, 'healer');
//                         client1.emit('attack room1', 500);
//                         client1.on('end room1', (outcome) => {
//                             assert.equal(outcome, 'win');
//                             client1.disconnect();
//                             client2.disconnect();
//                             done();
//                         });
//                     });
//                 });
//             });
//         });
//     });
//
//     // it('should receive start since two players join and then lose due to cheat lose', (done) => {
//     //     var client1 = io(socketURL, options);
//     //
//     //     client1.on('connect', () => {
//     //         var client2  = io(socketURL, options);
//     //
//     //         client2.on('connect', () => {
//     //             client1.emit('setup user', {name: "healer"});
//     //             client2.emit('setup user', {name: "warrior"});
//     //
//     //             client1.emit('create room', 'room2', 'game');
//     //
//     //             client1.emit('join room', 'room2');
//     //             client2.emit('join room', 'room2');
//     //             client1.disconnect();
//     //             client2.disconnect();
//     //             done();
//     //             // Control so that the target is in arr and dmg correct interval (-20, -50)
//     //             client1.on('start room2', () => {
//     //                 client1.on('next turn room2', (user) => {
//     //
//     //                     assert.equal(user, 'healer');
//     //
//     //                     client1.emit('cheat lose room2');
//     //                     console.log("CHEEEEEEEEEEEEEEEEEEEEEEEE")
//     //                     client1.emit('new turn room2');
//     //
//     //                     client1.on('end room2', (outcome) => {
//     //                         assert.equal(outcome, 'lose');
//     //                         client1.disconnect();
//     //                         client2.disconnect();
//     //                         done();
//     //
//     //                     });
//     //                 });
//     //             });
//     //         });
//     //     });
//     // });
// });
