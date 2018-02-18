'use strict';
import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from '../../services/utils.service';
const config = require('../../config');


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
        return next({message: checkReqBody.message});
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
                    // res.json(rows);
                    // console.log("Success");
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

module.exports = {
    recommendedUpComingMovies: recommendedUpComingMovies,
    getAddedUpComingMovies: getAddedUpComingMovies,
    addUpComingMovie: addUpComingMovie,
    searchUpComingMovies: searchUpComingMovies
};

