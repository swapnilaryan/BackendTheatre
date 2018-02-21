/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

const express = require('express');
const router = express.Router();


const adminRegisterLoginLogout =
    require('../controllers/admin/adminRegisterLoginLogout.controller');

const omdb = require('../controllers/omdb/omdb.controller');

router.get('/movie/:imdbID', omdb.getMovieByImdbID);


module.exports = router;
