/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

var reqPro = require('request-promise');
var config = require('../../config');

var getMovieByID = function getMovieByID(req, res, next) {
    /** @namespace config.app */
    var url = 'http://api.themoviedb.org/3/movie/' + req.params.movieID + '?api_key=' + config.app.theMovieDBKey;
    reqPro(url).then(function (response) {}).catch(function (err) {
        next({ error: err });
    });
};

module.exports = {
    getMovieByID: getMovieByID
};
//# sourceMappingURL=theMovieDB.controller.js.map
