'use strict';

var express = require('express');
var router = express.Router();
var admin = require('./admin');
var session = require('express-session');

/* GET home page. */
router.get('/healthCheck', function (req, res, next) {
  return res.send(req.session);
});

/**
 * All the api and their links to files will be here
 */
router.use('/admin', admin);

module.exports = router;
//# sourceMappingURL=index.js.map