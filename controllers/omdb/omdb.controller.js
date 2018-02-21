/**
 * Created by swapnil on 19/02/18.
 */
'use strict';
const reqPro = require('request-promise');
const config = require('../../config');
const deferred = require('deferred');

const getMovieByImdbID = (req, res, next, isAPI=true) => {
    let defer;
    if (!isAPI) {
        defer = deferred();
    }
    let url = `http://www.omdbapi.com/?i=${req.params.imdbID}&plot=full&r=json&
    tomatoes=true&r=json&apikey=${config.app.omdbAPIKey}`;
    reqPro(url)
        .then((response) => {
            if (isAPI) {
                res.send(JSON.parse(response));
            } else {
                defer.resolve(JSON.parse(response));
            }
        })
        .catch((err) => {
            console.log(err);
            if (isAPI) {
                next({error: '' + err});
            } else {
                defer.reject(err);
            }
        });
    if (!isAPI) {
        return defer.promise;
    }
};

module.exports = {
    getMovieByImdbID: getMovieByImdbID
};
