'use strict';
// use -> /api/rottenTomatoes/....
const express = require('express');
const router = express.Router();

const adminRegisterLoginLogout =
    require('../controllers/admin/adminRegisterLoginLogout.controller');

const rottenCrawler = require('../controllers/rottenTomatoes/rottenTomatoes.controller');

router.post('/rating', rottenCrawler.crawlData);
router.get('/:imdbID', rottenCrawler.getRottenTomatoInfo);

module.exports = router;
