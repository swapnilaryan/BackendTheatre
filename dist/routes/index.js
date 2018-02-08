'use strict';

var express = require('express');
var router = express.Router();
var admin = require('./admin');

/* GET home page. */
router.get('/healthCheck', function (req, res, next) {
  return res.send('Backend Theatre working fine.');
});

/**
 * All the api and their links to files will be here
 */
router.use('/admin', admin);
module.exports = router;
//# sourceMappingURL=index.js.map