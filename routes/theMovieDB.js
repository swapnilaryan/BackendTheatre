/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

// use -> /api/theMovieDB/....

const express = require('express');
const router = express.Router();

const adminRegisterLoginLogout =
    require('../controllers/admin/adminRegisterLoginLogout.controller');

const theMovieDB = require('../controllers/theMovieDB/theMovieDB.controller');
const theMovieDBSearch = require('../controllers/theMovieDB/theMovieDBSearch.controller');

router.get('/movie/:movieID', theMovieDB.getMovieByID);
router.get('/movie/externalID/:movieID', theMovieDB.getExternalID);
router.get('/movie/credits/:imdbID', theMovieDB.getMovieCreditsByImdbID);
router.post('/movie/search', theMovieDBSearch.searchMovie);

module.exports = router;
