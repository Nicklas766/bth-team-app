var assert = require('assert');

// To avoid errors
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;


var app = require('../../app.js');

var agent = require('supertest').agent(app);

describe('Reset db, 403 response for /denied, fail to login', () => {
    it('should reset database and return 200', (done) => {
        agent.post("/api/reset")
            .expect(200, done);
    });

    it('should reset database and return 403', (done) => {
        agent.get("/session/denied")
            .expect(403, done);
    });

    it('should try to login and get response 404 since it doesnt exist', (done) => {
        agent.post("/session/login")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "password123"
            })
            .expect(404, done);
    });
});

describe('Create a user and login with it', () => {
    it('should create user and return user object', (done) => {
        agent.post("/api/insert")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "password123"
            })
            .expect(function(res) {
                assert.equal(res.body.name, 'nicklas');
                assert.equal(res.body.pass, 'password123');
            })
            .expect(200, done);
    });

    it('should login with the newly created user', (done) => {
        agent.post("/session/login")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "password123"
            })
            .expect(200, done);
    });

    it('should incorrectly login with the newly created user', (done) => {
        agent.post("/session/login")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "wrongpassword"
            })
            .expect(401, done);
    });
});

describe('Try out the session and login', () => {
    it('should return user nicklas as an object', (done) => {
        agent.get("/session/profile")
            .set('Accept', 'application/json')
            .set('session', {name: 'nicklas'})
            .expect(function(res) {
                assert.equal(res.body.name, 'nicklas');
                assert.equal(res.body.pass, 'password123');
            })
            .expect(200, done);
    });

    it('should logout the agent', (done) => {
        agent.post("/session/logout")
            .expect(200, done);
    });

    it('should return a 302 response and redirect to /denied', (done) => {
        agent.get("/session/profile")
            .expect('Location', '/session/denied')
            .expect(302, done);
    });
});
