/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

const express = require('express');
const router = express.Router();


const adminRegisterLoginLogout =
    require('../controllers/admin/adminRegisterLoginLogout.controller');

const searchKIM = require('../controllers/kidsInMind/search.controller');

router.get('/search/:movieName', searchKIM.searchMovies);


module.exports = router;