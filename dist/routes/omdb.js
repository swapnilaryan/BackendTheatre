/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

// use -> /api/omdb/....

var express = require('express');
var router = express.Router();

var adminRegisterLoginLogout = require('../controllers/admin/adminRegisterLoginLogout.controller');

var omdb = require('../controllers/omdb/omdb.controller');

router.get('/movie/:imdbID', omdb.getMovieByImdbID);

module.exports = router;
//# sourceMappingURL=omdb.js.map