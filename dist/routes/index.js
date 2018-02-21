'use strict';

var express = require('express');
var router = express.Router();
var session = require('express-session');
var admin = require('./admin');
var kidsInMind = require('./kidsInMind');
var omdb = require('./omdb');
var theMovieDB = require('./theMovieDB');

/* GET home page. */
router.get('/healthCheck', function (req, res, next) {
  return res.send(req.session);
});

/**
 * All the api and their links to files will be here
 */
router.use('/admin', admin);
router.use('/kidsInMind', kidsInMind);
router.use('/omdb', omdb);
router.use('/theMovieDB', theMovieDB);
module.exports = router;
//# sourceMappingURL=index.js.map