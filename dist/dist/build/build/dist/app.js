'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var session = require('express-session');
var config = require('./config');
var moment = require('moment');
var index = require('./routes/index');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Access-Control-Allow-Origin', 'http://localhost:9003');
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// expires: moment().add(5, 'hours').add(30 + config.app.cookieMaxAge, 'minutes')
//     .local().toDate()

app.use(session({
    key: 'userSID',
    cookie: {
        secure: false,
        maxAge: moment().local().toDate(),
        expires: moment().add(config.app.cookieMaxAge, 'day').local().toDate()
    },
    secret: 'qwerty',
    resave: false,
    saveUninitialized: false
}));

app.use('/api', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map