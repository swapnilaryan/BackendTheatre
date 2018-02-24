'use strict';

var _connectMySQL = require('../../database/connectMySQL');

var mysqlDetails = _interopRequireWildcard(_connectMySQL);

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

var _async = require('async');

var async = _interopRequireWildcard(_async);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var config = require('../../config');
var theMovieDB = require('../theMovieDB/theMovieDB.controller');
var omdb = require('../omdb/omdb.controller');
var currentMovies = require('./currentMovies.controller');
var rottenTomatoes = require('../rottenTomatoes/rottenTomatoes.controller');

var recommendedUpComingMovies = function recommendedUpComingMovies(req, res, next) {
    /*Searching from Database*/
    // for time being using this..
    var query = 'SELECT * FROM ?? WHERE ??=0 AND `upReleaseDate` BETWEEN (CURDATE())' + ' AND (DATE_SUB( CURDATE() ,INTERVAL -20 DAY))';
    //var query = "SELECT * FROM ?? WHERE ?? LIKE ? AND ";
    var table = ['admin_upcomingmovies', 'upAddByAdmin'];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({
                        message: err
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

var getAddedUpComingMovies = function getAddedUpComingMovies(req, res, next) {
    /*Searching from Database*/
    // for time being using this..
    // let query = 'SELECT * FROM ?? WHERE ?? BETWEEN ' +
    //     '((DATE_SUB( CURDATE() ,INTERVAL -1 DAY))) AND ' +
    //     '(DATE_SUB( CURDATE() ,INTERVAL -30 DAY)) AND ??=1';

    var query = 'SELECT * FROM ?? WHERE ??=1';
    //var query = "SELECT * FROM ?? WHERE ?? LIKE ? AND ";
    var table = ['admin_upcomingmovies', 'upAddByAdmin'];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({ error: err });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({ error: err });
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
var addUpComingMovie = function addUpComingMovie(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['movieID'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.params, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    var query = 'UPDATE ?? SET ?? = ? WHERE ??=?';
    var table = ['admin_upcomingmovies', 'upAddByAdmin', 1, 'upMovieId', req.params.movieID];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({ error: err });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({ error: err });
                } else {
                    var _query = 'SELECT * FROM ?? WHERE ??=?';
                    //var query = "SELECT * FROM ?? WHERE ?? LIKE ? AND ";
                    /** @namespace req.params.movieID */
                    var _table = ['admin_upcomingmovies', 'upMovieId', req.params.movieID];
                    _query = mysqlDetails.mysqlFormat(_query, _table);
                    mysqlDetails.pool.getConnection(function (err, connection) {
                        if (err) {
                            next({ error: err });
                        } else {
                            connection.query(_query, function (err, rows) {
                                if (err) {
                                    next({ error: err });
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
                    // res.json(rows);
                    // console.log("Success");
                }
            });
        }
        connection.release();
    });
};

var searchUpComingMovies = function searchUpComingMovies(req, res, next) {
    /*Searching from Database*/
    // for time being using this
    var query = 'SELECT * FROM ?? WHERE ?? LIKE ? AND `upReleaseDate` BETWEEN' + ' (CURDATE()) AND (DATE_SUB( CURDATE() ,INTERVAL -20 DAY))';
    //var query = "SELECT * FROM ?? WHERE ?? LIKE ? AND ";
    /** @namespace req.params.movieName */
    var table = ['admin_upcomingmovies', 'upMovieName', '%' + req.params.movieName + '%'];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({ error: err });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({ error: err });
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

var removeUpComingMovies = function removeUpComingMovies(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['movieID'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.params, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    var query = 'UPDATE ?? SET ?? = ? WHERE ??=?';
    var table = ['admin_upcomingmovies', 'upAddByAdmin', 0, 'upMovieId', req.params.movieID];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({ error: err });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({ error: err });
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

var moveToCurrent = function moveToCurrent(req, res, next) {
    var currentMovie = void 0;
    async.waterfall([function (callback) {
        theMovieDB.getExternalID(req, res, next, false).then(function (response) {
            currentMovie = response;
            callback(null, currentMovie);
        });
    }, function (result, callback) {
        req.params.imdbID = result.imdb_id;
        theMovieDB.getMovieCreditsByImdbID(req, res, next, false).then(function (response) {
            Object.assign(currentMovie, currentMovie, response);
            callback(null, currentMovie);
        });
    }, function (result, callback) {
        theMovieDB.getMovieByID(req, res, next, false).then(function (response) {
            // currentMovie = response;
            Object.assign(currentMovie, currentMovie, response);
            callback(null, currentMovie);
        });
    }, function (result, callback) {
        omdb.getMovieByImdbID(req, res, next, false).then(function (response) {
            // Special case. We won't store runtime from OMDB
            response.Runtime = currentMovie.runtime;
            Object.assign(currentMovie, currentMovie, response);
            callback(null, currentMovie);
        });
    }], function (err, result) {
        //final result or err
        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                if (key.charAt(0).toLowerCase() !== key.charAt(0)) {
                    var tempkey = key.charAt(0).toLowerCase() + key.slice(1);
                    result[tempkey] = result[key];
                    delete result[key];
                }
            }
        }
        req.body = result;
        req.body.cast = JSON.stringify(result.cast);
        /** @namespace req.params.isAPI */
        if (req.params.isAPI == 'true') {
            // coercion required.
            res.json({
                message: 'success',
                data: result
            });
        } else {
            // call rotten tomatoes
            req.body.movieURL = result.tomatoURL;
            req.body.imdbID = result.imdbID;
            rottenTomatoes.crawlData(req, res, next, false);
            currentMovies.addCurrentMovies(req, res, next);
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
//# sourceMappingURL=upComingMovies.controller.js.map