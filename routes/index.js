'use strict';

const express = require('express');
const router = express.Router();
const admin = require('./admin');
const kidsInMind = require('./kidsInMind');
const omdb = require('./omdb');
const theMovieDB = require('./theMovieDB');
const rottenTomatoes = require('./rottenTomatoes');

/* GET home page. */
router.get('/healthCheck', (req, res, next) => res.send(req.session));

/**
 * All the api and their links to files will be here
 */
router.use('/admin', admin);
router.use('/kidsInMind', kidsInMind);
router.use('/omdb', omdb);
router.use('/theMovieDB', theMovieDB);
router.use('/rottenTomatoes', rottenTomatoes);
module.exports = router;
