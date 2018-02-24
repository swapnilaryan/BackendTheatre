/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

var reqPro = require('request-promise');
var config = require('../../config');
var deferred = require('deferred');

var getMovieByImdbID = function getMovieByImdbID(req, res, next) {
    var isAPI = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var defer = void 0;
    if (!isAPI) {
        defer = deferred();
    }
    var url = 'http://www.omdbapi.com/?tomatoes=true&i=' + req.params.imdbID;
    url = url + '&plot=full&r=json&r=json&apikey=' + config.app.omdbAPIKey;
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
    getMovieByImdbID: getMovieByImdbID
};
//# sourceMappingURL=omdb.controller.js.map