/**
 * Created by swapnil on 19/02/18.
 */
'use strict';

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
                movieName: req.params.movieName,
                kimRating: null
            };
            var children = searchResults[i].children;
            if (children[0].data.indexOf(req.params.movieName) > -1) {
                temp.kimRating = children[0].data.replace(req.params.movieName, '');
                temp.kimRating = temp.kimRating.trim();
                result.push(temp);
            }
        }
        res.json({
            data: result
        });
    }).catch(function (err) {
        next({ error: err });
    });
};

module.exports = {
    searchMovies: searchMovies
};
//# sourceMappingURL=theMovieDB.controller.js.map
