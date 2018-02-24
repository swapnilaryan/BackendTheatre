/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

// use -> /api/theMovieDB/....

var express = require('express');
var router = express.Router();

var adminRegisterLoginLogout = require('../controllers/admin/adminRegisterLoginLogout.controller');

var theMovieDB = require('../controllers/theMovieDB/theMovieDB.controller');
var theMovieDBSearch = require('../controllers/theMovieDB/theMovieDBSearch.controller');

router.get('/movie/:movieID', theMovieDB.getMovieByID);
router.get('/movie/externalID/:movieID', theMovieDB.getExternalID);
router.get('/movie/credits/:imdbID', theMovieDB.getMovieCreditsByImdbID);
router.post('/movie/search', theMovieDBSearch.searchMovie);

module.exports = router;
//# sourceMappingURL=theMovieDB.js.map