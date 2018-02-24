/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

const express = require('express');
const router = express.Router();

// use-> /api/kidsInMind/...

const adminRegisterLoginLogout =
    require('../controllers/admin/adminRegisterLoginLogout.controller');

const kimController = require('../controllers/kidsInMind/kidsInMind.controller');

router.get('/search/:movieName', kimController.searchMovies);
router.post('/addTODB', kimController.addKIMRating);

module.exports = router;
