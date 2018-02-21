/**
 * Created by swapnil on 19/02/18.
 */
'use strict';
const reqPro = require('request-promise');
const cheerio = require('cheerio');

const searchMovies = (req, res, next) => {
    let url = `http://www.kids-in-mind.com/cgi-bin/search/search.pl?q=
    ${req.params.movieName}`;
    reqPro(url)
        .then(function (htmlString) {
            let result = [];
            const $ = cheerio.load(htmlString);
            const searchResults = $('p[start="1"]').find('a');
            for (let i = 0; i < searchResults.length; i++) {
                let temp = {
                    movieName: req.params.movieName,
                    kimRating: null
                };
                let children = searchResults[i].children;
                if (children[0].data.indexOf(req.params.movieName) > -1) {
                    temp.kimRating = children[0].data.replace(req.params.movieName, '');
                    temp.kimRating = temp.kimRating.trim();
                    result.push(temp);
                }
            }
            res.json({
                data: result
            });
        })
        .catch(function (err) {
            next({error: err});
        });
};

module.exports = {
    searchMovies: searchMovies
};