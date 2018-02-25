/**
 * Created by swapnil on 19/02/18.
 */
'use strict';
const reqPro = require('request-promise');
const config = require('../../config');
const deferred = require('deferred');

/** @namespace config.app */

const getMovieByID = (req, res, next, isAPI = true) => {
    let defer;
    if (!isAPI) {
        defer = deferred();
    }
    if ( !(req.params.hasOwnProperty('movieID') && req.params.movieID)) {
        next({
            message: 'movieID missing',
            details: 'Request params passed is' + JSON.stringify(req.params)
        });
    }
    let url = config.app.theMovieDBURL + '/movie/' + req.params.movieID +
        '?api_key=' + config.app.theMovieDBKey;
    reqPro(url)
        .then((response) => {
            if (isAPI) {
                res.send(JSON.parse(response));
            } else {
                return defer.resolve(JSON.parse(response));
            }
        })
        .catch((err) => {
            console.log(err);
            if (isAPI) {
                next({error: '' + err});
            } else {
                return defer.reject(err);
            }
        });
    if (!isAPI) {
        return defer.promise;
    }
};

let getMovieCreditsByImdbID = (req, res, next, isAPI = true) => {
    let defer;
    if (!isAPI) {
        defer = deferred();
    }
    if ( !(req.params.hasOwnProperty('imdbID') && req.params.imdbID)) {
        next({
            message: 'imdbID missing',
            details: 'Request params passed is' + JSON.stringify(req.params)
        });
    }
    let url = config.app.theMovieDBURL + '/movie/' + req.params.imdbID +
        '/credits?api_key=' + config.app.theMovieDBKey;
    reqPro(url)
        .then(function (response) {
            if (isAPI) {
                res.send(JSON.parse(response));
            } else {
                return defer.resolve(JSON.parse(response));
            }
        })
        .catch(function (err) {
            console.log(err);
            if (isAPI) {
                next({error: '' + err});
            } else {
                return defer.reject(err);
            }
        });
    if (!isAPI) {
        return defer.promise;
    }
};


let getExternalID = (req, res, next, isAPI = true) => {
    let defer;
    if (!isAPI) {
        defer = deferred();
    }
    if ( !(req.params.hasOwnProperty('movieID') && req.params.movieID)) {
        next({
            message: 'movieID missing',
            details: 'Request params passed is' + JSON.stringify(req.params)
        });
    }
    let url = config.app.theMovieDBURL + '/movie/' + req.params.movieID +
        '/external_ids?api_key=' + config.app.theMovieDBKey;
    reqPro(url)
        .then(function (response) {
            if (isAPI) {
                res.send(JSON.parse(response));
            } else {
                return defer.resolve(JSON.parse(response));
            }
        })
        .catch(function (err) {
            console.log(err);
            if (isAPI) {
                next({error: '' + err});
            } else {
                return defer.reject(err);
            }
        });
    if (!isAPI) {
        return defer.promise;
    }
};

module.exports = {
    getMovieByID: getMovieByID,
    getMovieCreditsByImdbID: getMovieCreditsByImdbID,
    getExternalID: getExternalID
};
