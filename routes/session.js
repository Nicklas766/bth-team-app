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

// A route that shows that you was denied entry
router.get('/denied', (req, res) => {
    res.status(403).send('denied, youre not logged in');
});


// Redirect to login if not logged in
const checkIsLogin = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.status(403).redirect('/session/denied');
};


// Returns user data, if not logged in "checkIsLogin()" will take care of that
router.get('/profile', checkIsLogin, async (req, res) => {
    try {
        const user = await users.fetchOne({
            name: req.session.user
        });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).send(err);
    }
});


module.exports = router;
