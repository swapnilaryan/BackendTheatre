/**
 * Created by swapnil on 23/02/18.
 */

'use strict';

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

var _async = require('async');

var async = _interopRequireWildcard(_async);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var reqPro = require('request-promise');
var cheerio = require('cheerio');
var config = require('../../config');


var ratingRegex = /(\d+)?(.)?\d+\/\d+$/;
var rc = {
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

var audienceScore = function audienceScore($, obj) {
    obj.tomatoMeter = /\d+/.exec($('.audience-score .meter-value span').text())[0];

    var temp = $('.audience-info > div:first-of-type').text().trim().match(ratingRegex);
    obj.averageRating = temp ? temp[0].trim() : 'N/A';
    obj.ratingCount = parseInt(/((\d+)?(\,)?)*\d+$/.exec($('.audience-info >' + ' div:last-of-type').text().trim())[0].replace(',', ''));
    return obj;
};

var allCritics = function allCritics($, obj) {
    var allCriticsID = '#all-critics-numbers';
    obj.freshness = !$(allCriticsID).find('.meter-tomato').hasClass('fresh') ? 'rotten' : 'fresh';

    var temp = parseInt($(allCriticsID).find('.meter-value span').text());
    obj.tomatoMeter = isNaN(temp) ? 'N/A' : temp;

    temp = $(allCriticsID).find('#scoreStats > div:first-of-type');
    temp = temp.text().trim().match(ratingRegex);
    obj.averageRating = temp ? temp[0].trim() : 'N/A';

    temp = /\d+$/.exec($(allCriticsID).find('#scoreStats >' + ' div:nth-of-type(2)').text().trim());
    if (temp) {
        temp = parseInt(temp[0]);
    }
    obj.reviewCount = isNaN(temp) ? 'N/A' : temp;

    temp = /\d+$/.exec($(allCriticsID).find('#scoreStats >' + ' div:nth-of-type(3)').text().trim());
    if (temp) {
        temp = parseInt(temp[0]);
    }
    obj.freshCount = isNaN(temp) ? 'N/A' : temp;

    temp = /\d+$/.exec($(allCriticsID).find('#scoreStats >' + ' div:nth-of-type(4)').text().trim());
    if (temp) {
        temp = parseInt(temp[0]);
    }
    obj.rottenCount = isNaN(temp) ? 'N/A' : temp;
    obj.criticsConsensus = $(allCriticsID).find('.critic_consensus').clone().find('span').remove().end().text().trim();

    return obj;
};

var topCritics = function topCritics($, obj) {
    var topCriticsID = '#top-critics-numbers';
    obj.freshness = $(topCriticsID).find('.meter-tomato').hasClass('fresh') ? 'fresh' : 'rotten';
    var temp = void 0,
        temp2 = void 0;
    temp = parseInt($(topCriticsID).find('.meter-value span').text());
    temp2 = parseInt($(topCriticsID).find('.meter-value').text().replace('%', ''));
    obj.tomatoMeter = temp ? temp : temp2;

    temp = $(topCriticsID).find('#scoreStats > div:first-of-type').text().trim().match(ratingRegex);

    obj.averageRating = temp ? temp[0].trim() : 'N/A';

    temp = parseInt($(topCriticsID).find('#scoreStats span[itemprop*=reviewCount]').text().trim());
    temp2 = $(topCriticsID).find('#scoreStats span').contents()[2];
    if (temp2) {
        temp2 = parseInt(temp2.data);
    }
    obj.reviewCount = temp ? temp : temp2;

    temp = /\d+$/.exec($(topCriticsID).find('#scoreStats >div:nth-of-type(3)').text().trim());
    obj.freshCount = temp ? parseInt(temp[0]) : 'N/A';

    temp = /\d+$/.exec($(topCriticsID).find('#scoreStats >div:nth-of-type(4)').text().trim());
    obj.rottenCount = temp ? parseInt(temp[0]) : 'N/A';

    obj.criticsConsensus = $(topCriticsID).find('.critic_consensus').clone().find('span').remove().end().text().trim();

    return obj;
};

var insertData = function insertData(req, res, next, isAPI) {
    var tableName = 'admin_movietomatoes';

    var columns = ['mtImdbID', 'mtMovieTitle', 'mtAllCritics', 'mtTopCritics', 'mtAudienceScore', 'mtMovieDescription', 'mtGenre'];

    var values = [req.body.imdbID, req.body.movieTitle, JSON.stringify(req.body.allCritics), JSON.stringify(req.body.topCritics), JSON.stringify(req.body.audienceScore), req.body.movieDescription, JSON.stringify(req.body.genre)];

    utils.insertToDB(tableName, columns, values).then(function (success) {
        if (isAPI) {
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
    }, function (errResponse) {
        next({ message: errResponse.error });
    });
};

var crawlData = function crawlData(req, res, next) {
    var isAPI = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    // Check for mandatory fields
    var mandatoryFields = ['movieURL', 'imdbID'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        next({ message: checkReqBody.message });
    }

    if (!req.body.hasOwnProperty('isAPI')) {
        req.body.isAPI = false;
    }
    req.body.movieURL = req.body.movieURL.replace('https://www.rottentomatoes.com/m/', '');
    req.body.movieURL = req.body.movieURL.replace('http://www.rottentomatoes.com/m/', '');
    /** @namespace req.body.movieURL */
    reqPro('http://www.rottentomatoes.com/m/' + req.body.movieURL).then(function (htmlString) {
        var $ = cheerio.load(htmlString);
        var movieTitleID = '#movie-title';
        rc.movieTitle = $(movieTitleID).clone().find('span').remove().end().text();
        rc.movieTitle = rc.movieTitle.trim();
        rc.releaseYear = parseInt(/\d+/.exec($(movieTitleID).text())[0]);
        rc.movieDescription = $('#movieSynopsis').text().trim();

        rc.genre = $('.movie_info .content-meta .meta-row').find($('.meta-value')).eq(1).text().trim().split('\n').join('').split(',');

        var temp = [];
        rc.genre.filter(function (item) {
            temp.push(item.trim());
        });
        rc.genre = temp;

        rc.boxOffice = $('.content-meta.info >li div:contains(\'Box Office\') ').next('div').text().trim() || 'N/A';

        async.parallel([function (callback) {
            callback(null, audienceScore($, rc.audienceScore));
        }, function (callback) {
            callback(null, allCritics($, rc.allCritics));
        }, function (callback) {
            callback(null, topCritics($, rc.topCritics));
        }], function (err, results) {
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
    }).catch(function (err) {
        console.log(err);
        next({ message: '' + err });
    });
};

module.exports = {
    crawlData: crawlData
};
//# sourceMappingURL=rottenTomatoes.controller.js.map