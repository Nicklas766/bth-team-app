var assert = require('assert');

// To avoid errors
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;


var app = require('../../app.js');

var agent = require('supertest').agent(app);

describe('Tests for the /protected route and api', () => {
    describe('Reset database', () => {
        it('should reset database and return 200', (done) => {
            agent.post("/api/reset")
                .expect(200, done);
        });
    });

    describe('Try to access pages that are protected by login', () => {
        it('should return a 302 response and redirect to /login', (done) => {
            agent.get("/protected/profile")
                .expect('Location', '/login')
                .expect(302, done);
        });

        it('should return a 302 response and redirect to /login', (done) => {
            agent.post("/protected/save")
                .expect('Location', '/login')
                .expect(302, done);
        });
    });


    // Note that we are not testing create and login here, we're only doing it
    // to setup the testing enviorment
    describe('Create & Login and then get data from user from /protected/profile', () => {
        it('should create user and return user object', (done) => {
            agent.post("/account/insert")
                .set('Accept', 'application/json')
                .send({
                    name: "James",
                    pass: "password123"
                })
                .expect(200, done);
        });

        it('should login with the newly created user', (done) => {
            agent.post("/account/login")
                .set('Accept', 'application/json')
                .send({
                    name: "James",
                    pass: "password123"
                })
                .expect(200, done);
        });

        it('should return data for the user we logged in with', (done) => {
            agent.get("/protected/profile")
                .set('Accept', 'application/json')
                .expect(function(res) {
                    assert.equal(res.body.name, 'James');
                    assert.equal(res.body.pass, 'password123');
                    assert.equal(res.body.wins, 0);
                    assert.equal(res.body.losses, 0);
                })
                .expect(200, done);
        });
    });


    describe('Should with the current login, return user obj with 1 win', () => {
        it('should save a win and return user with 1 wins and 0 losses', (done) => {
            agent.post("/protected/save")
                .set('Accept', 'application/json')
                .send({
                    win: 1,
                    loss: 0
                })
                .expect(function(res) {
                    assert.equal(res.body.wins, 1);
                    assert.equal(res.body.losses, 0);
                })
                .expect(200, done);
        });

        it('should save a win and return user with 2 wins and 0 losses', (done) => {
            agent.post("/protected/save")
                .set('Accept', 'application/json')
                .send({
                    win: 1,
                    loss: 0
                })
                .expect(function(res) {
                    assert.equal(res.body.wins, 2);
                    assert.equal(res.body.losses, 0);
                })
                .expect(200, done);
        });

        it('should save a loss and return user with 2 wins and 1 losses', (done) => {
            agent.post("/protected/save")
                .set('Accept', 'application/json')
                .send({
                    win: 0,
                    loss: 1
                })
                .expect(function(res) {
                    assert.equal(res.body.wins, 2);
                    assert.equal(res.body.losses, 1);
                })
                .expect(200, done);
        });
    });
});
