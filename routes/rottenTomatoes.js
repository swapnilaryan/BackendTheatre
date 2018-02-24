'use strict';

const express = require('express');
const router = express.Router();

const adminRegisterLoginLogout =
    require('../controllers/admin/adminRegisterLoginLogout.controller');

const rottenCrawler = require('../controllers/rottenTomatoes/rottenTomatoes.controller');

router.post('/rating', rottenCrawler.crawlData);
module.exports = router;
