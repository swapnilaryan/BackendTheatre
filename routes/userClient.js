/**
 * Created by swapnil on 13/03/18.
 */
'use strict';

// use -> /api/theMovieDB/....

const express = require('express');
const router = express.Router();

const upcomingMovies = require('../controllers/userClient/upcomingMovies.controller');
const nowShowingMovies = require('../controllers/userClient/nowShowingMovies.controller');
router.get('/upcomingMovies', upcomingMovies.getUpComingMovies);
router.get('/nowShowingMovies', nowShowingMovies.getNowShowingMovies);

module.exports = router;
