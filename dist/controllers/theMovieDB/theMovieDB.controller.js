/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

var reqPro = require('request-promise');
var config = require('../../config');
var deferred = require('deferred');

/** @namespace config.app */

var getMovieByID = function getMovieByID(req, res, next) {
    var isAPI = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var defer = void 0;
    if (!isAPI) {
        defer = deferred();
    }
    var url = config.app.theMovieDBURL + '/movie/' + req.params.movieID + '?api_key=' + config.app.theMovieDBKey;
    reqPro(url).then(function (response) {
        if (isAPI) {
            res.send(JSON.parse(response));
        } else {
            return defer.resolve(JSON.parse(response));
        }
    }).catch(function (err) {
        console.log(err);
        if (isAPI) {
            next({ error: '' + err });
        } else {
            return defer.reject(err);
        }
    });
    if (!isAPI) {
        return defer.promise;
    }
};

var getMovieCreditsByImdbID = function getMovieCreditsByImdbID(req, res, next) {
    var isAPI = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var defer = void 0;
    if (!isAPI) {
        defer = deferred();
    }
    var url = config.app.theMovieDBURL + '/movie/' + req.params.imdbID + '/credits?api_key=' + config.app.theMovieDBKey;
    reqPro(url).then(function (response) {
        if (isAPI) {
            res.send(JSON.parse(response));
        } else {
            return defer.resolve(JSON.parse(response));
        }
    }).catch(function (err) {
        console.log(err);
        if (isAPI) {
            next({ error: '' + err });
        } else {
            return defer.reject(err);
        }
    });
    if (!isAPI) {
        return defer.promise;
    }
};

var getExternalID = function getExternalID(req, res, next) {
    var isAPI = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var defer = void 0;
    if (!isAPI) {
        defer = deferred();
    }
    var url = config.app.theMovieDBURL + '/movie/' + req.params.movieID + '/external_ids?api_key=' + config.app.theMovieDBKey;
    reqPro(url).then(function (response) {
        if (isAPI) {
            res.send(JSON.parse(response));
        } else {
            return defer.resolve(JSON.parse(response));
        }
    }).catch(function (err) {
        console.log(err);
        if (isAPI) {
            next({ error: '' + err });
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
//# sourceMappingURL=theMovieDB.controller.js.map