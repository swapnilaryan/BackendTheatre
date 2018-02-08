'use strict';

const express = require('express');
const router = express.Router();
const admin = require('./admin');

/* GET home page. */
router.get('/healthCheck', (req, res, next) => res.send('Backend Theatre working fine.'));


/**
 * All the api and their links to files will be here
 */
router.use('/admin', admin);
module.exports = router;
