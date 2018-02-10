'use strict';

const express = require('express');
const router = express.Router();
const admin = require('./admin');
const session = require('express-session');

/* GET home page. */
router.get('/healthCheck', (req, res, next) => res.send(req.session));

/**
 * All the api and their links to files will be here
 */
router.use('/admin', admin);

module.exports = router;
