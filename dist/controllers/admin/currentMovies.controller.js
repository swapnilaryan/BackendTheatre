/**
 * Created by swapnil on 18/02/18.
 */
'use strict';

var _connectMySQL = require('../../database/connectMySQL');

var mysqlDetails = _interopRequireWildcard(_connectMySQL);

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getCurrentMovies = function getCurrentMovies(req, res, next) {
    /*Searching from Database*/
    // for time being using this
    // var query = "SELECT * FROM ?? WHERE ??=? AND `upReleaseDate` BETWEEN (CURDATE()) AND (DATE_SUB( CURDATE() ,INTERVAL -20 DAY))";
    var query = 'SELECT * FROM ?? WHERE ?? != ?';
    var table = ['admin_movieinfo', 'infoMovieRuntime', 'N/A'];
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
                        messgae: 'Successfully fetched current movies',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
    /*End searching*/
};

var getMovieSchedule = function getMovieSchedule(req, res, next) {
    var query = 'SELECT m_s.*,a_m.* FROM ?? as m_s ' + 'JOIN  ?? as a_m ON m_s.movieImdbID = a_m.infoImdbID';
    var table = ['movie_schedule', 'admin_movieinfo'];
    if (req.params.movieImdbID) {
        query += ' WHERE m_s.movieImdbID = ?';
        table = ['movie_schedule', 'admin_movieinfo', req.params.movieImdbID];
    }
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
                        message: 'Successfully fetched movie schedule',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
};

var getScreens = function getScreens(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['screenType'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.params, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    var query = 'SELECT * FROM ?? WHERE ?? LIKE ?';
    /** @namespace req.params.screenType */
    var table = ['admin_setting_screen', 'screenType', '%' + req.params.screenType + '%'];
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
                        message: 'Successfully fetched screens',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
};

var deleteMovieSchedule = function deleteMovieSchedule(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['movieType', 'movieScreen', 'movieShowDate', 'movieStartTime', 'movieEndTime'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({ error: err });
        } else {
            var query = 'DELETE FROM ?? WHERE (??=?) ' + 'AND (??=?)  AND (??=?)  AND (??=?)  AND (??=?) ';

            var values = ['movie_schedule', 'movieType', req.body.movieType, 'movieScreen', req.body.movieScreen, 'movieShowDate', req.body.movieShowDate, 'movieStartTime', req.body.movieStartTime, 'movieEndTime', req.body.movieEndTime];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, values, function (err, rows) {
                if (err) {
                    next({ error: err });
                } else {
                    res.json({
                        message: 'Successfully deleted showtime',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
};

var updateMovieSchedule = function updateMovieSchedule(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['movieImdbID', 'movieType', 'movieScreen', 'movieShowDate', 'movieStartTime', 'movieEndTime'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({ error: err });
        } else {
            var query = 'UPDATE ?? SET  ??=?,??=?,??=?,??=?,??=?,??=?';
            var values = ['movie_schedule', 'movieImdbID', req.body.movieImdbID, 'movieType', req.body.movieType, 'movieScreen', req.body.movieScreen, 'movieShowDate', req.body.movieShowDate, 'movieStartTime', req.body.movieStartTime, 'movieEndTime', req.body.movieEndTime];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, function (err, rows) {
                if (err) {
                    next({ error: err });
                } else {
                    res.json({
                        message: 'Successfully updated the movie showtime',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
};

var addMovieSchedule = function addMovieSchedule(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['movieImdbID', 'movieType', 'movieScreen', 'movieShowDate', 'movieStartTime', 'movieEndTime'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({ error: err });
        } else {
            var tableName = 'movie_schedule';

            var columns = ['movieImdbID', 'movieType', 'movieScreen', 'movieShowDate', 'movieStartTime', 'movieEndTime'];

            var values = [req.body.movieImdbID, req.body.movieType, req.body.movieScreen, req.body.movieShowDate, req.body.movieStartTime, req.body.movieEndTime];

            var result = utils.insertToDB(tableName, columns, values).then(function (success) {
                res.json({
                    message: 'Successfully added movie showtime',
                    data: success.data
                });
            }, function (errResponse) {
                next({ error: errResponse.error });
            });

            if (result.hasOwnProperty('error')) {
                next({ error: err });
            } else if (result.hasOwnProperty('data')) {
                res.json({
                    message: 'Successfully added movie showtime',
                    data: result.data
                });
            }
        }
        connection.release();
    });
};

var addCurrentMovies = function addCurrentMovies(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['id', 'imdb_id', 'title', 'released', 'runtime', 'rated', 'director', 'writer', 'genre', 'imdbRating', 'production', 'website', 'plot', 'poster_path', 'cast', 'boxOffice'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({ error: err });
        } else {
            var tableName = 'admin_movieinfo';

            var columns = ['infoMovieID', 'infoImdbID', 'infoMovieName', 'infoMovieInTheatres', 'infoMovieRuntime', 'infoMovieRated', 'infoMovieDirectedBy', 'infoMovieWrittenBy', 'infoMovieGenre', 'infoMovieImdbRating', 'infoMovieProduction', 'infoMovieWebsite', 'infoMovieDescription', 'infoMoviePosterPath', 'infoMovieCasts', 'infoMovieBoxOffice'];

            var values = [req.body.id, req.body.imdbID, req.body.title, req.body.released, req.body.runtime, req.body.rated, req.body.director, req.body.writer, req.body.genre, req.body.imdbRating, req.body.production, req.body.website, req.body.plot, '/images/nowShowing' + req.body.poster_path, req.body.cast, req.body.boxOffice];

            utils.insertToDB(tableName, columns, values).then(function (success) {
                res.json({
                    message: 'Successfully added movie to current',
                    data: success.data
                });
            }, function (errResponse) {
                next({ error: errResponse.error });
            });
        }
        connection.release();
    });
};
module.exports = {
    getCurrentMovies: getCurrentMovies,
    getMovieSchedule: getMovieSchedule,
    getScreens: getScreens,
    deleteMovieSchedule: deleteMovieSchedule,
    updateMovieSchedule: updateMovieSchedule,
    addMovieSchedule: addMovieSchedule,
    addCurrentMovies: addCurrentMovies
};
//# sourceMappingURL=currentMovies.controller.js.map