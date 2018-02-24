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

module.exports = {
    searchMovies: searchMovies
};
//# sourceMappingURL=kidsInMind.controller.js.map
