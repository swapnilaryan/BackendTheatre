'use strict';
import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from '../../services/utils.service';
import * as async from 'async';
const config = require('../../config');
const theMovieDB = require('../theMovieDB/theMovieDB.controller');
const omdb = require('../omdb/omdb.controller');
const currentMovies = require('./currentMovies.controller');
const kimController = require('../kidsInMind/kidsInMind.controller');
const rottenTomatoes = require('../rottenTomatoes/rottenTomatoes.controller');

let recommendedUpComingMovies = (req, res, next) => {
    /*Searching from Database*/
    // for time being using this..
    let query = 'SELECT * FROM ?? WHERE ??=0 AND `upReleaseDate` BETWEEN (CURDATE())' +
        ' AND (DATE_SUB( CURDATE() ,INTERVAL -20 DAY))';
    //var query = "SELECT * FROM ?? WHERE ?? LIKE ? AND ";
    let table = ['admin_upcomingmovies', 'upAddByAdmin'];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: utils.jsonResponse(err)
            });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({
                        message: utils.jsonResponse(err)
                    });
                } else {
                    res.json({
                        message: 'Successfully fetched recommended movies',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
    /*End searching*/
};

let getAddedUpComingMovies = (req, res, next) => {
    /*Searching from Database*/
    // for time being using this..
    // let query = 'SELECT * FROM ?? WHERE ?? BETWEEN ' +
    //     '((DATE_SUB( CURDATE() ,INTERVAL -1 DAY))) AND ' +
    //     '(DATE_SUB( CURDATE() ,INTERVAL -30 DAY)) AND ??=1';

    let query = 'SELECT * FROM ?? WHERE ??=1';
    //var query = "SELECT * FROM ?? WHERE ?? LIKE ? AND ";
    let table = ['admin_upcomingmovies', 'upAddByAdmin'];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({error: err});
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({error: err});
                } else {
                    res.json({
                        message: 'success',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
    /*End searching*/
};

// Still to be finished
let addUpComingMovie = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['movieID'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.params, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: utils.jsonResponse(checkReqBody.message)});
    }

    let query = 'UPDATE ?? SET ?? = ? WHERE ??=?';
    let table = ['admin_upcomingmovies', 'upAddByAdmin', 1, 'upMovieId', req.params.movieID];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({error: err});
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({error: err});
                } else {
                    let query = 'SELECT * FROM ?? WHERE ??=?';
                    //var query = "SELECT * FROM ?? WHERE ?? LIKE ? AND ";
                    /** @namespace req.params.movieID */
                    let table = ['admin_upcomingmovies', 'upMovieId', req.params.movieID];
                    query = mysqlDetails.mysqlFormat(query, table);
                    mysqlDetails.pool.getConnection(function (err, connection) {
                        if (err) {
                            next({error: err});
                        } else {
                            connection.query(query, function (err, rows) {
                                if (err) {
                                    next({error: err});
                                } else {
                                    res.json({
                                        message: 'success',
                                        data: rows[0]
                                    });
                                    // reqPro('http://' + configJson.localhost + ':' + configJson.sitePort + '/api/the_movie_db/' + rowws[0].upMovieName)
                                    //     .then(function (response) {
                                    //         //rottenTomatoesURL.replace("http://www.rottentomatoes.com/m/","")
                                    //         reqPro('http://' + configJson.localhost + ':' + configJson.sitePort + '/api/rotten_tomatoes/' + rowws[0].upMovieName)
                                    //             .then(function (response) {
                                    //             });
                                    //     });
                                    //
                                    // reqPro('http://' + configJson.localhost + ':' + configJson.sitePort + '/api/db/copy/upcomingmovies/' + rowws[0].upMovieName)
                                    //     .then(function (response) {
                                    //         // res.json(response);
                                    //     });
                                }
                            });
                        }
                        connection.release();
                    });
                }
            });
        }
        connection.release();
    });
};

let searchUpComingMovies = (req, res, next) => {
    /*Searching from Database*/
    // for time being using this
    let query = 'SELECT * FROM ?? WHERE ?? LIKE ? AND `upReleaseDate` BETWEEN' +
        ' (CURDATE()) AND (DATE_SUB( CURDATE() ,INTERVAL -20 DAY))';
    //var query = "SELECT * FROM ?? WHERE ?? LIKE ? AND ";
    /** @namespace req.params.movieName */
    let table = ['admin_upcomingmovies', 'upMovieName', '%' + req.params.movieName + '%'];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({error: err});
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({error: err});
                } else {
                    res.json({
                        message: 'success',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
};

let removeUpComingMovies = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['movieID'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.params, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: utils.jsonResponse(checkReqBody.message)});
    }

    let query = 'UPDATE ?? SET ?? = ? WHERE ??=?';
    let table = ['admin_upcomingmovies', 'upAddByAdmin', 0, 'upMovieId',
        req.params.movieID];
    query = mysqlDetails.mysqlFormat(query, table);
    console.log(query);
    mysqlDetails.pool.getConnection((err, connection) => {
        if (err) {
            next({error: err});
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({error: err});
                } else {
                    res.json({
                        message: 'Successfully removed from upcoming list',
                        data: rows
                    });
                }
            });
        }
    });
};

let moveToCurrent = (req, res, next) => {
    let currentMovie;
    async.waterfall(
        [
            (callback) => {
                theMovieDB.getExternalID(req, res, next, false).then((response) => {
                    currentMovie = response;
                    callback(null, currentMovie);
                }, (error) => {
                    callback(error);
                });
            },
            (result, callback) => {
                req.params.imdbID = result.imdb_id;
                theMovieDB.getMovieCreditsByImdbID(req, res, next, false)
                    .then((response) => {
                        Object.assign(currentMovie, currentMovie, response);
                        callback(null, currentMovie);
                    }, (error) => {
                        callback(error);
                    });
            },
            (result, callback) => {
                theMovieDB.getMovieByID(req, res, next, false).then((response) => {
                    // currentMovie = response;
                    Object.assign(currentMovie, currentMovie, response);
                    callback(null, currentMovie);
                }, (error) => {
                    callback(error);
                });
            },
            (result, callback) => {
                omdb.getMovieByImdbID(req, res, next, false).then((response) => {
                    // Special case. We won't store runtime from OMDB
                    response.Runtime = currentMovie.runtime;
                    Object.assign(currentMovie, currentMovie, response);
                    callback(null, currentMovie);
                }, (error) => {
                    callback(error);
                });
            },
        ],
        (err, result) => {
            if (err) {
                next({message: utils.jsonResponse(err)});
            }
            //final result or err
            for (let key in result) {
                if (result.hasOwnProperty(key)) {
                    if (key.charAt(0).toLowerCase() !== key.charAt(0)) {
                        let tempkey = key.charAt(0).toLowerCase() + key.slice(1);
                        result[tempkey] = result[key];
                        delete result[key];
                    }
                }
            }
            req.body = result;
            req.body.cast = JSON.stringify(result.cast);
            /** @namespace req.params.isAPI */
            if (req.params.isAPI == 'true') { // coercion required.
                res.json({
                    message: 'success',
                    data: result
                });
            } else {
                // call rotten tomatoes
                req.body.movieURL = result.tomatoURL;
                req.body.imdbID = result.imdbID;
                currentMovies.addCurrentMovies(req, res, next);
                rottenTomatoes.crawlData(req, res, next, false);
                req.params.movieName = result.original_title + ' ' + parseInt(result.year);
                kimController.searchAndAdd(req, res, next);
            }
        });
};

module.exports = {
    recommendedUpComingMovies: recommendedUpComingMovies,
    getAddedUpComingMovies: getAddedUpComingMovies,
    addUpComingMovie: addUpComingMovie,
    searchUpComingMovies: searchUpComingMovies,
    removeUpComingMovies: removeUpComingMovies,
    moveToCurrent: moveToCurrent
};

