/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

var express = require('express');
var router = express.Router();

// use-> /api/kidsInMind/...

var adminRegisterLoginLogout = require('../controllers/admin/adminRegisterLoginLogout.controller');

var kimController = require('../controllers/kidsInMind/kidsInMind.controller');

router.get('/search/:movieName', kimController.searchMovies);
router.post('/addTODB', kimController.addKIMRating);

module.exports = router;
//# sourceMappingURL=kidsInMind.js.map
//# sourceMappingURL=kidsInMind.js.map
//# sourceMappingURL=kidsInMind.js.map
//# sourceMappingURL=kidsInMind.js.map
//# sourceMappingURL=kidsInMind.js.map