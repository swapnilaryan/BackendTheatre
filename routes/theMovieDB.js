/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

const express = require('express');
const router = express.Router();

const adminRegisterLoginLogout =
    require('../controllers/admin/adminRegisterLoginLogout.controller');

const theMovieDB = require('../controllers/theMovieDB/theMovieDB.controller');

router.get('/movie/:movieID', theMovieDB.getMovieByID);
router.get('/movie/credits/:imdbID', theMovieDB.getMovieCreditsByImdbID);


module.exports = router;
