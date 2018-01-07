var express = require('express');
var router = express.Router();
const dsn = process.env.DBWEBB_DSN || "mongodb://localhost:27017/user";
const users = require('mongo-connecter').init(dsn, 'users');



// returns all users in database
router.get('/users', async (req, res) => {
    try {
        const userList = await users.fetch();

        res.status(200).json(userList);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// delete everything in collection "users"
router.post('/reset', async (req, res) => {
    try {
        await users.reset();
        res.status(200).send('collection reset complete');
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;
