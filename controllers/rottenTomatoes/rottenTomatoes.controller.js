/**
 * Created by swapnil on 23/02/18.
 */

'use strict';
const reqPro = require('request-promise');
const cheerio = require('cheerio');
const config = require('../../config');
import * as utils from '../../services/utils.service';
import * as async from 'async';

let ratingRegex = /(\d+)?(.)?\d+\/\d+$/;
let rc = {
    movieTitle: 'N/A',
    releaseYear: 'N/A',
    allCritics: {
        freshness: 'N/A',
        tomatoMeter: 'N/A',
        averageRating: 'N/A',
        reviewCount: 'N/A',
        freshCount: 'N/A',
        rottenCount: 'N/A',
        criticsConsensus: 'N/A'
    },
    topCritics: {
        freshness: 'N/A',
        tomatoMeter: 'N/A',
        averageRating: 'N/A',
        reviewCount: 'N/A',
        freshCount: 'N/A',
        rottenCount: 'N/A',
        criticsConsensus: 'N/A'
    },
    audienceScore: {
        tomatoMeter: 'N/A',
        averageRating: 'N/A',
        ratingCount: 'N/A'
    },
    movieDescription: 'N/A',
    genre: 'N/A',
    boxOffice: 'N/A'
};

const audienceScore = ($, obj) => {
    obj.tomatoMeter = /\d+/.exec($('.audience-score .meter-value span').text())[0];

    let temp = $('.audience-info > div:first-of-type').text().trim().match(ratingRegex);
    obj.averageRating = (temp) ? temp[0].trim() : 'N/A';
    obj.ratingCount = parseInt(/((\d+)?(\,)?)*\d+$/.exec($('.audience-info >' +
        ' div:last-of-type').text().trim())[0].replace(',', ''));
    return obj;
};

const allCritics = ($, obj) => {
    let allCriticsID = '#all-critics-numbers';
    obj.freshness = !$(allCriticsID).find('.meter-tomato').hasClass('fresh') ?
        'rotten' : 'fresh';

    let temp = parseInt($(allCriticsID).find('.meter-value span').text());
    obj.tomatoMeter = (isNaN(temp)) ? 'N/A' : temp;

    temp = $(allCriticsID).find('#scoreStats > div:first-of-type');
    temp = temp.text().trim().match(ratingRegex);
    obj.averageRating = (temp) ? (temp[0].trim()) : 'N/A';

    temp = /\d+$/.exec($(allCriticsID).find('#scoreStats >' +
        ' div:nth-of-type(2)').text().trim());
    if (temp) {
        temp = parseInt(temp[0]);
    }
    obj.reviewCount = (isNaN(temp)) ? 'N/A' : temp;

    temp = /\d+$/.exec($(allCriticsID).find('#scoreStats >' +
        ' div:nth-of-type(3)').text().trim());
    if (temp) {
        temp = parseInt(temp[0]);
    }
    obj.freshCount = (isNaN(temp)) ? 'N/A' : temp;

    temp = /\d+$/.exec($(allCriticsID).find('#scoreStats >' +
        ' div:nth-of-type(4)').text().trim());
    if (temp) {
        temp = parseInt(temp[0]);
    }
    obj.rottenCount = (isNaN(temp)) ? 'N/A' : temp;
    obj.criticsConsensus = $(allCriticsID).find('.critic_consensus').clone()
        .find('span').remove().end().text().trim();

    return obj;

};

const topCritics = ($, obj) => {
    const topCriticsID = '#top-critics-numbers';
    obj.freshness = $(topCriticsID).find('.meter-tomato').hasClass('fresh') ?
        'fresh' : 'rotten';
    let temp, temp2;
    temp = parseInt($(topCriticsID).find('.meter-value span').text());
    temp2 = parseInt(($(topCriticsID).find('.meter-value').text()).replace('%', ''));
    obj.tomatoMeter = (temp) ? temp : temp2;

    temp = $(topCriticsID).find('#scoreStats > div:first-of-type').text()
        .trim().match(ratingRegex);

    obj.averageRating = (temp) ? temp[0].trim() : 'N/A';

    temp = parseInt($(topCriticsID).find('#scoreStats span[itemprop*=reviewCount]')
        .text().trim());
    temp2 = ((($(topCriticsID).find('#scoreStats span')).contents())[2]);
    if (temp2) {
        temp2 = parseInt(temp2.data);
    }
    obj.reviewCount = (temp) ? temp : temp2;

    temp = /\d+$/.exec($(topCriticsID)
        .find('#scoreStats >div:nth-of-type(3)').text().trim());
    obj.freshCount = (temp) ? parseInt(temp[0]) : 'N/A';

    temp = /\d+$/.exec($(topCriticsID)
        .find('#scoreStats >div:nth-of-type(4)').text().trim());
    obj.rottenCount = (temp)? parseInt(temp[0]) : 'N/A';

    obj.criticsConsensus = $(topCriticsID).find('.critic_consensus').clone()
        .find('span').remove().end().text().trim();

    return obj;
};

const insertData = (req, res, next, isAPI) => {
    let tableName = 'admin_movietomatoes';

    let columns = ['mtImdbID', 'mtMovieTitle',
        'mtAllCritics', 'mtTopCritics',
        'mtAudienceScore', 'mtMovieDescription',
        'mtGenre'];

    let values = [req.body.imdbID, req.body.movieTitle,
        JSON.stringify(req.body.allCritics), JSON.stringify(req.body.topCritics),
        JSON.stringify(req.body.audienceScore), req.body.movieDescription,
        JSON.stringify(req.body.genre)];

    utils.insertToDB(tableName, columns, values)
        .then((success) => {
            if (isAPI){
                res.json({
                    message: 'Rotten Tomatoes data saved Successfully',
                    data: success.data
                });
            } else {
                console.log('Rotten Tomatoes data saved in DB successfully');
                if (!req.body.isAPI) {
                    res.json({
                        message: 'Rotten Tomatoes data saved Successfully',
                        data: success.data
                    });
                }
            }
        }, (errResponse) => {
            next({message: errResponse.error});
        });
};

const crawlData = (req, res, next, isAPI = false) => {
    // Check for mandatory fields
    let mandatoryFields = ['movieURL', 'imdbID'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        next({message: checkReqBody.message});
    }

    if (!req.body.hasOwnProperty('isAPI')) {
        req.body.isAPI = false;
    }
    req.body.movieURL = req.body.movieURL.replace('https://www.rottentomatoes.com/m/', '');
    req.body.movieURL = req.body.movieURL.replace('http://www.rottentomatoes.com/m/', '');
    /** @namespace req.body.movieURL */
    reqPro('http://www.rottentomatoes.com/m/' + req.body.movieURL)
        .then((htmlString) => {
            let $ = cheerio.load(htmlString);
            let movieTitleID = '#movie-title';
            rc.movieTitle = $(movieTitleID).clone().find('span').remove().end().text();
            rc.movieTitle = rc.movieTitle.trim();
            rc.releaseYear = parseInt(/\d+/.exec($(movieTitleID).text())[0]);
            rc.movieDescription = $('#movieSynopsis').text().trim();

            rc.genre = $('.movie_info .content-meta .meta-row').find($('.meta-value'))
                .eq(1).text().trim().split('\n').join('').split(',');

            let temp = [];
            rc.genre.filter((item) => {
                temp.push(item.trim());
            });
            rc.genre = temp;

            rc.boxOffice = $('.content-meta.info >li div:contains(\'Box Office\') ')
                    .next('div').text().trim() || 'N/A';

            async.parallel([
                    (callback) => {
                        callback(null, audienceScore($, rc.audienceScore));
                    },
                    (callback) => {
                        callback(null, allCritics($, rc.allCritics));
                    },
                    (callback) => {
                        callback(null, topCritics($, rc.topCritics));
                    }
                ],
                (err, results) => {
                    rc.allCritics = results[1];
                    rc.topCritics = results[2];
                    rc.audienceScore = results[0];
                    Object.assign(req.body, req.body, rc);
                    if (req.body.isAPI) {
                        res.json({
                            message: 'Crawled data success',
                            data: rc
                        });
                    } else {
                        insertData(req, res, next, isAPI);
                    }
                });
        })
        .catch((err) => {
            console.log(err);
            next({message: '' + err});
        });
};

module.exports = {
    crawlData: crawlData
};
