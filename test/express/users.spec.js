var assert = require('assert');

// To avoid errors
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;


var app = require('../../backend/app.js');

var agent = require('supertest').agent(app);



describe('Reset database', () => {
    it('should reset database and return 200', (done) => {
        agent.post("/api/reset")
            .expect(200, done);
    });
});


describe('Create two users and get all users', () => {
    it('should create user', (done) => {
        agent.post("/account/insert")
            .set('Accept', 'application/json')
            .send({
                name: "James1",
                pass: "password123"
            })
            .expect(200, done);
    });

    it('should create user', (done) => {
        agent.post("/account/insert")
            .set('Accept', 'application/json')
            .send({
                name: "James2",
                pass: "password123"
            })
            .expect(200, done);
    });

    it('should return an array with all users (james1 and james2)', (done) => {
        agent.get("/api/users")
            .set('Accept', 'application/json')
            .expect(function(res) {
                assert.equal(res.body[0].name, 'James1');
                assert.equal(res.body[1].name, 'James2');
            })
            .expect(200, done);
    });
});
