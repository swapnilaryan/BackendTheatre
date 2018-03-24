/**
 * Created by swapnil on 13/03/18.
 */
'use strict';

// use -> /api/theMovieDB/....

const express = require('express');
const router = express.Router();

const upcomingMovies = require('../controllers/userClient/upcomingMovies.controller');
const nowShowingMovies = require('../controllers/userClient/nowShowingMovies.controller');
const movieDetails = require('../controllers/userClient/movieDetails.controller');
const adminCurrentMovies = require('../controllers/admin/currentMovies.controller');

router.get('/upcomingMovies', upcomingMovies.getUpComingMovies);
router.get('/nowShowingMovies', nowShowingMovies.getNowShowingMovies);
router.get('/movieDetails/:imdbID', movieDetails.getMovieDetails);
router.get('/movieSchedule/:movieImdbID?', adminCurrentMovies.getMovieSchedule);
module.exports = router;
