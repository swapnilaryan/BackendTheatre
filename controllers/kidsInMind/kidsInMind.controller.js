/**
 * Created by swapnil on 19/02/18.
 */
'use strict';
const reqPro = require('request-promise');
const cheerio = require('cheerio');
import * as utils from '../../services/utils.service';

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
                    movieName: null,
                    kimRating: null,
                    movieKIMURL: searchResults[i].attribs.href
                };
                let children = searchResults[i].children;
                let idx = children[0].data.indexOf('[');
                if (idx > -1) {
                    temp.movieName = children[0].data.substr(0, idx - 1);
                    temp.movieName = temp.movieName.trim();

                    temp.kimRating = children[0].data.substr(idx - 1,
                        children[0].data.length);
                    temp.kimRating = temp.kimRating.trim();
                    result.push(temp);
                }
            }
            res.json({
                message: 'success',
                data: result
            });
        })
        .catch(function (err) {
            console.log(err);
            next({error: err});
        });
};


const addKIMRating = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['movieKIMURL', 'kimRating', 'movieName'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: checkReqBody.message});
    }
    let url = req.body.movieKIMURL;

    reqPro(url)
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const searchResults = $('p[class="t11normal"]').find('a');
            let imdbID = searchResults.get(5).attribs.href;
            imdbID = imdbID.replace('http://www.imdb.com/title/', '').replace('/', '');
            let tableName = 'moviekidsinmind';

            let columns = ['movieKIM_IMDB', 'movieKIM_MovieName', 'movieKIM_Rating'];

            let values = [imdbID, req.body.movieName, req.body.kimRating];

            utils.insertToDB(tableName, columns, values)
                .then((success) => {
                    res.json({
                        message: 'Added rating of Kids in mind for ' + req.body.movieName,
                        data: success.data
                    });
                }, (errResponse) => {
                    next({message: errResponse.error});
                });
        })
        .catch(function (err) {
            console.log(err);
            next({message: err});
        });
};

module.exports = {
    searchMovies: searchMovies,
    addKIMRating: addKIMRating
};
