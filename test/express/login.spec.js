var assert = require('assert');

// To avoid errors
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;


var app = require('../../app.js');

var agent = require('supertest').agent(app);

describe('Should reset and check that we cant login', () => {
    it('should reset database and return 200', (done) => {
        agent.post("/session/reset")
            .expect(200, done);
    });

    it('should try to login and get error', (done) => {
        agent.post("/session/login")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "password123"
            })
            .expect(500, done);
    });
});

describe('Create a user and login with it', () => {
    it('should create user and return user object', (done) => {
        agent.post("/session/insert")
            .set('Accept', 'application/json')
            .set('Cookie', ['myApp-token=12345667', 'myApp-other=blah'])
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
