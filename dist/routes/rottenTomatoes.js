'use strict';
// use -> /api/rottenTomatoes/....

var express = require('express');
var router = express.Router();

var adminRegisterLoginLogout = require('../controllers/admin/adminRegisterLoginLogout.controller');

var rottenCrawler = require('../controllers/rottenTomatoes/rottenTomatoes.controller');

router.post('/rating', rottenCrawler.crawlData);
module.exports = router;
//# sourceMappingURL=rottenTomatoes.js.map