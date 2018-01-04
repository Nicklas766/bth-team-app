var assert = require('assert');

// To avoid errors
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;


var app = require('../../backend/app.js');

var agent = require('supertest').agent(app);

describe('Reset db and fail to login', () => {
    it('should reset database and return 200', (done) => {
        agent.post("/api/reset")
            .expect(200, done);
    });

    it('should try to login and get response 404 since it doesnt exist', (done) => {
        agent.post("/account/login")
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
        agent.post("/account/insert")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "password123"
            })
            .expect(200, done);
    });

    it('should login with the newly created user', (done) => {
        agent.post("/account/login")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "password123"
            })
            .expect(200, done);
    });

    it('should incorrectly login with the newly created user', (done) => {
        agent.post("/account/login")
            .set('Accept', 'application/json')
            .send({
                name: "nicklas",
                pass: "wrongpassword"
            })
            .expect(401, done);
    });
});

describe('Try out logout by checking that we can access profile and then not', () => {
    it('should return user nicklas as an object', (done) => {
        agent.get("/protected/profile")
            .set('Accept', 'application/json')
            .expect(function(res) {
                assert.equal(res.body.name, 'nicklas');
                assert.equal(res.body.pass, 'password123');
            })
            .expect(200, done);
    });

    it('should logout the agent', (done) => {
        agent.post("/account/logout")
            .expect(200, done);
    });

    it('should return a 302 response and redirect to /login', (done) => {
        agent.get("/protected/profile")
            .expect('Location', '/login')
            .expect(302, done);
    });
});
