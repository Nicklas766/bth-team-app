var express = require('express');
var router = express.Router();
const dsn = process.env.DBWEBB_DSN || "mongodb://192.168.99.100:27017/user";
const users = require('mongo-connecter').init(dsn, 'users');


// Gets the user based on name and checks if correct password
router.post('/login', async (req, res) => {
    const name = req.body.name;
    const pass = req.body.pass;

    try {
        const user = await users.fetchOne({name: name});

        if (user.pass === pass) {
            req.session.user = name;
            return res.status(200).send('Success!');
        }

        return res.status(401).send('Invalid details!');
    } catch (err) {
        return res.status(404).send(err);
    }
});


// Logout by setting user to null
router.post('/logout', (req, res) => {
    req.session.user = null;
    res.status(200).send('Session.user set to null');
});


// Make sure post is not empty
const validatePost = (req, res, next) => {
    const name = req.body.name;
    const pass = req.body.pass;

    // if it doesnt exist or empty string
    if ((!name || !pass) || (name.length == 0 || pass.length == 0)) {
        return res.status(401).send('Nothing was sent');
    }

    return next();
};

// Inserts users to collection while returning user object. If exists return error code
router.post("/insert", validatePost, async (req, res) => {
    const name = req.body.name;
    const pass = req.body.pass;

    try {
        // Check if user already exists
        const user = await users.fetchOne({name: name});

        if (user !== null) {
            return res.status(401).send('User already exists');
        }

        // insert and fetch user
        const newUser = await users.collectionDo(
            col => col.insert({
                name: name,
                pass: pass,
                wins: 0,
                losses: 0
            }),
            col => col.findOne({name: name})
        );

        return res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
