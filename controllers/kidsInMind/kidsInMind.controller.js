/**
 * Created by swapnil on 19/02/18.
 */
'use strict';
const reqPro = require('request-promise');
const cheerio = require('cheerio');
import * as utils from '../../services/utils.service';
import * as async from 'async';
const deferred = require('deferred');
const searchMovies = (req, res, next) => {
    if (!req.body.hasOwnProperty('isAPI')) {
        req.body.isAPI = true;
    }
    let defer;
    if (!req.body.isAPI) {
        defer = deferred();
    }
    let url = 'http://www.kids-in-mind.com/cgi-bin/search/search.pl?q=' +
        '' + req.params.movieName;
    console.log(url);
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
            if (req.body.isAPI) {
                res.json({
                    message: 'success',
                    data: result
                });
            } else {
                return defer.resolve(result);
            }
        })
        .catch(function (err) {
            console.log(err);
            if (req.body.isAPI) {
                next({error: err});
            } else {
                return defer.reject(err);
            }
        });
    if (!req.body.isAPI) {
        return defer.promise;
    }
};


const addKIMRating = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['movieKIMURL', 'kimRating', 'movieName'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: utils.jsonResponse(checkReqBody.message)});
    }
    if (!req.body.hasOwnProperty('isAPI')) {
        req.body.isAPI = true;
    }

    let url = req.body.movieKIMURL;
    reqPro(url)
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const searchResults = $('p[class="t11normal"]').find('a');
            let imdbID = searchResults.get(5).attribs.href;
            imdbID = imdbID.replace('http://www.imdb.com/title/', '').replace('/', '');
            imdbID = imdbID.split('/');
            if (imdbID.length > 1 && imdbID[imdbID.length - 1] === '') {
				imdbID = imdbID[imdbID.length - 2];
			} else {
            	imdbID = imdbID[0];
			}
            let tableName = 'moviekidsinmind';

            let columns = ['movieKIM_IMDB', 'movieKIM_MovieName', 'movieKIM_Rating'];

            let values = [imdbID, req.body.movieName, req.body.kimRating];
            utils.insertToDB(tableName, columns, values)
                .then((success) => {
                    if (req.body.isAPI) {
                        res.json({
                            message: 'Added rating of Kids in mind for ' +
                            '' + req.body.movieName,
                            data: success.data
                        });
                    } else {
                        console.log('Added rating of Kids in mind for' +
                            ' req.body.movieName in DB');
                    }
                }, (errResponse) => {
                    if (req.body.isAPI) {
                        next({message: utils.jsonResponse(errResponse.error)});
                    } else {
                        console.log(errResponse);
                    }
                });

        })
        .catch((err) => {
            console.log(err);
            if (req.body.isAPI) {
                next({message: utils.jsonResponse(err)});
            } else {
                return err;
            }
        });
};

function parallelFunctionBuilder(params) {
    return function () {
        addKIMRating({body: params});
    };
}
let searchAndAdd = (req, res, next) => {
    let funcArray = [];
    req.body.isAPI = false;
    searchMovies(req, res, next).then((response) => {
        for (let i = 0; i < response.length; i++) {
            response[i].isAPI = false;
            funcArray.push(parallelFunctionBuilder(response[i]));
        }
        if (funcArray.length) {
            async.parallel(funcArray, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Successfully added kids in mind in db', results);
                }
            });
        }
    }, (errResponse) => {
        console.log(errResponse);
    });
};
module.exports = {
    searchMovies: searchMovies,
    addKIMRating: addKIMRating,
    searchAndAdd: searchAndAdd
};
