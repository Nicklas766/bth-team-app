var assert = require('assert');

// To avoid errors
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;


var app = require('../../app.js');

var agent = require('supertest').agent(app);


describe('Check so everything works when creating user', () => {
    it('should reset database and return 200', (done) => {
        agent.post("/api/reset")
            .expect(200, done);
    });

    it('should create nicklas and return user object', (done) => {
        agent.post("/account/insert")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "password123"
            })
            .expect(function(res) {
                assert.equal(res.body.name, 'nicklas');
                assert.equal(res.body.pass, 'password123');
                assert.equal(res.body.wins, 0);
                assert.equal(res.body.losses, 0);
            })
            .expect(200, done);
    });

    it('should return 401 response since nicklas alreay exists', (done) => {
        agent.post("/account/insert")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "password123"
            })
            .expect(401, done);
    });

    it('should create Jason and return user object', (done) => {
        agent.post("/account/insert")
            .set('Accept', 'application/json')
            .send({
                name: "Jason",
                pass: "password123"
            })
            .expect(function(res) {
                assert.equal(res.body.name, 'Jason');
                assert.equal(res.body.pass, 'password123');
                assert.equal(res.body.wins, 0);
                assert.equal(res.body.losses, 0);
            })
            .expect(200, done);
    });

    it('should return 401 response since Jason alreay exists', (done) => {
        agent.post("/account/insert")
            .set('Accept', 'application/json')
            .send({
                name: "Jason",
                pass: "password123"
            })
            .expect(401, done);
    });

    it('should return 401 response since no input', (done) => {
        agent.post("/account/insert")
            .set('Accept', 'application/json')
            .expect(401, done);
    });

    it('should return 401 response since length == 0', (done) => {
        agent.post("/account/insert")
            .set('Accept', 'application/json')
            .send({
                name: "",
                pass: ""
            })
            .expect(401, done);
    });
});
