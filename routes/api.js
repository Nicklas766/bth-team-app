var express = require('express');
var router = express.Router();
const dsn = process.env.DBWEBB_DSN || "mongodb://192.168.99.100:27017/user";
const users = require('mongo-connecter').init(dsn, 'users');


// Make sure post is not empty
const validatePost = (req, res, next) => {
    const name = req.body.name;
    const pass = req.body.pass;

    // if it doesnt exist or empty string
    if ((!name || !pass) || (name.length == 0 || pass.length == 0)) {
        return res.status(401).send('Nothing was sent');
    }

    return next();

}
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
                pass: pass
            }),
            col => col.findOne({name: name})
        );
        return res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
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
