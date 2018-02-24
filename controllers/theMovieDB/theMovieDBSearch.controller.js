'use strict';

import * as utils from '../../services/utils.service';

const reqPro = require('request-promise');
const config = require('../../config');


let searchMovie = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['query'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: checkReqBody.message});
    }

    let options = {
        method: 'GET',
        url: config.app.theMovieDBURL + '/search/movie',
        qs: {
            page: req.body.page || 1,
            query: req.body.query,
            language: 'en-US',
            api_key: config.app.theMovieDBKey
        },
        body: '{}'
    };

    if (req.body.year) {
        options.year = req.body.year;
    }

    reqPro(options)
        .then((response) => {
            res.json(JSON.parse(response));
        })
        .catch( (err) => {
            next({error: '' + err});
        });
};
module.exports = {
    searchMovie: searchMovie
};