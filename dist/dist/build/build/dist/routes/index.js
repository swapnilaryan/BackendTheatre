'use strict';

var express = require('express');
var router = express.Router();
var admin = require('./admin');
var kidsInMind = require('./kidsInMind');
var omdb = require('./omdb');
var theMovieDB = require('./theMovieDB');
var rottenTomatoes = require('./rottenTomatoes');

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
router.use('/rottenTomatoes', rottenTomatoes);
module.exports = router;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map