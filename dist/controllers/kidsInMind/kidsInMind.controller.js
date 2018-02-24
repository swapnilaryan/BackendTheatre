/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var reqPro = require('request-promise');
var cheerio = require('cheerio');


var searchMovies = function searchMovies(req, res, next) {
    var url = 'http://www.kids-in-mind.com/cgi-bin/search/search.pl?q=\n    ' + req.params.movieName;
    reqPro(url).then(function (htmlString) {
        var result = [];
        var $ = cheerio.load(htmlString);
        var searchResults = $('p[start="1"]').find('a');
        for (var i = 0; i < searchResults.length; i++) {
            var temp = {
                movieName: null,
                kimRating: null,
                movieKIMURL: searchResults[i].attribs.href
            };
            var children = searchResults[i].children;
            var idx = children[0].data.indexOf('[');
            if (idx > -1) {
                temp.movieName = children[0].data.substr(0, idx - 1);
                temp.movieName = temp.movieName.trim();

                temp.kimRating = children[0].data.substr(idx - 1, children[0].data.length);
                temp.kimRating = temp.kimRating.trim();
                result.push(temp);
            }
        }
        res.json({
            message: 'success',
            data: result
        });
    }).catch(function (err) {
        console.log(err);
        next({ error: err });
    });
};

var addKIMRating = function addKIMRating(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['movieKIMURL', 'kimRating', 'movieName'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }
    var url = req.body.movieKIMURL;

    reqPro(url).then(function (htmlString) {
        var $ = cheerio.load(htmlString);
        var searchResults = $('p[class="t11normal"]').find('a');
        var imdbID = searchResults.get(5).attribs.href;
        imdbID = imdbID.replace('http://www.imdb.com/title/', '').replace('/', '');
        var tableName = 'moviekidsinmind';

        var columns = ['movieKIM_IMDB', 'movieKIM_MovieName', 'movieKIM_Rating'];

        var values = [imdbID, req.body.movieName, req.body.kimRating];

        utils.insertToDB(tableName, columns, values).then(function (success) {
            res.json({
                message: 'Added rating of Kids in mind for ' + req.body.movieName,
                data: success.data
            });
        }, function (errResponse) {
            next({ message: errResponse.error });
        });
    }).catch(function (err) {
        console.log(err);
        next({ message: err });
    });
};

module.exports = {
    searchMovies: searchMovies,
    addKIMRating: addKIMRating
};
//# sourceMappingURL=kidsInMind.controller.js.map