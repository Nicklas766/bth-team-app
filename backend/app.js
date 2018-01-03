var express      = require('express');
var session      = require('express-session');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');


// Require routes modules for API
var api     = require('./routes/api');
var accountRoutes = require('./routes/account');
var protectedRoutes = require('./routes/protected');

var app = express();

// app.use for favicon and parsers
app.use(favicon(path.join(__dirname, 'public/images', 'monitor.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: 'my-badly-placed-token',
    resave: true,
    saveUninitialized: true
}));
// use specific route for the API-modules
app.use('/api', api);
app.use('/account', accountRoutes);
app.use('/protected', protectedRoutes);

// Routes for the client, these needs to be added if we want to load the
// react-page with HTTP-request since it's a "SPA".
app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(path.join(__dirname, 'public')));
app.use('/create', express.static(path.join(__dirname, 'public')));
app.use('/example', express.static(path.join(__dirname, 'public')));
app.use('/protected/profile', express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;

    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    // This will send a 404-code if catched and then our react-app has it's own
    // 404 route-handler which will show a "404-page".
    res.status(err.status || 500);
    res.sendFile(__dirname + '/client/public/index.html');
});

module.exports = app;
