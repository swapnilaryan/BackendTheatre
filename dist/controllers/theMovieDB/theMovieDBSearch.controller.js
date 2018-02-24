'use strict';
// use -> /api/theMovieDB/....

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

var _moment = require('moment');

var moment = _interopRequireWildcard(_moment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var reqPro = require('request-promise');
var config = require('../../config');

var searchMovie = function searchMovie(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['query'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    console.log(checkReqBody);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    var options = {
        method: 'GET',
        url: config.app.theMovieDBURL + '/search/movie',
        qs: {
            page: req.body.page || 1,
            query: req.body.query,
            language: 'en-US',
            api_key: config.app.theMovieDBKey,
            year: req.body.year || moment().format('YYYY')
        },
        body: '{}'
    };

    if (req.body.year) {
        options.year = req.body.year;
    }

    reqPro(options).then(function (response) {
        res.json({
            message: 'Movie found',
            data: JSON.parse(response)
        });
    }).catch(function (err) {
        next({ message: '' + err });
    });
};
module.exports = {
    searchMovie: searchMovie
};
//# sourceMappingURL=theMovieDBSearch.controller.js.map