'use strict';
// use -> /api/theMovieDB/....

import * as utils from '../../services/utils.service';
import * as moment from 'moment';
const reqPro = require('request-promise');
const config = require('../../config');


let searchMovie = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['query'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    console.log(checkReqBody);
    if (checkReqBody.message !== 'success') {
        return next({message: utils.jsonResponse(checkReqBody.message)});
    }

    let options = {
        method: 'GET',
        url: config.app.theMovieDBURL + '/search/movie',
        qs: {
            page: req.body.page || 1,
            query: req.body.query,
            region: 'US',
            language: 'en-US',
            api_key: config.app.theMovieDBKey,
            year: req.body.year || (moment().format('YYYY'))
        },
        body: '{}'
    };

    if (req.body.year) {
        options.year = req.body.year;
    }

    reqPro(options)
        .then((response) => {
            response = JSON.parse(response);
            let temp = response.results.filter( (item) => {
                if (item.original_language === 'en') {
                    return item;
                }
            });
            response.results = temp;
            res.json({
                message: 'Movie found',
                data: response
            });
        })
        .catch((err) => {
            next({message: utils.jsonResponse(err)});
        });
};
module.exports = {
    searchMovie: searchMovie
};
