var express = require('express');
var router = express.Router();
const dsn = process.env.DBWEBB_DSN || "mongodb://localhost:27017/user";
const users = require('mongo-connecter').init(dsn, 'users');


// Redirect to login if not logged in
router.use(function(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(403).redirect('/login');
});


// Returns user data, if not logged in "checkIsLogin()" will take care of that
router.get('/profiledata', async (req, res) => {
    try {
        const user = await users.fetchOne({name: req.session.user});

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// Fetches user based on session, then takes params and add them up and
// then add to database, so a win would be:
// newWins = user.win + 1
// newLosses = user.losses + 0
// And vice versa when loss (1 and 0 change places)
router.post('/save', async (req, res) => {
    try {
        const user = await users.fetchOne({name: req.session.user});
        const newWins  = user.wins + req.body.win;
        const newLosses = user.losses + req.body.loss;

        const newUser = await users.collectionDo(
            col => col.updateOne(
                {name: req.session.user}, { $set: { "wins": newWins, "losses": newLosses} }
            ),
            col => col.findOne({name: req.session.user})
        );

        return res.status(200).json(newUser);
    } catch (err) {
        return res.status(500).send(err);
    }
});


module.exports = router;
