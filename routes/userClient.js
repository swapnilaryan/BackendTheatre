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
const contact = require('../controllers/admin/contact.controller');
const locate = require('../controllers/admin/location.controller');
const social = require('../controllers/admin/social.controller');

router.get('/upcomingMovies', upcomingMovies.getUpComingMovies);
router.get('/nowShowingMovies', nowShowingMovies.getNowShowingMovies);
router.get('/movieDetails/:imdbID', movieDetails.getMovieDetails);
router.get('/movieSchedule/:movieImdbID?', adminCurrentMovies.getMovieSchedule);
router.get('/contactUs', contact.getAdminContactDetails);
router.get('/locateUs', locate.getAdminLocationDetails);
router.get('/social', social.getAdminSocialDetails);
module.exports = router;
