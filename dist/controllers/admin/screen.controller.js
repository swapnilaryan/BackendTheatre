/**
 * Created by swapnil on 12/02/18.
 */
'use strict';

var _connectMySQL = require('../../database/connectMySQL');

var mysqlDetails = _interopRequireWildcard(_connectMySQL);

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getAdminScreenDetails = function getAdminScreenDetails(req, res, next) {
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            connection.query('SELECT * FROM ??', ['admin_setting_screen'], function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    res.json({
                        message: 'Successfully fetched contact details',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
};

var updateAdminScreenDetails = function updateAdminScreenDetails(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['screenName', 'screenType', 'noOfSeats'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            res.json(err);
        } else {
            var query = 'UPDATE ?? SET screenName=?, screenType=?, noOfSeats=? ' + 'WHERE ??=?';
            var values = ['admin_setting_screen', req.body.screenName, req.body.screenType, req.body.noOfSeats, 'screenName', req.body.screenName];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, values, function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    getAdminScreenDetails(req, res, next);
                }
            });
        }
        connection.release();
    });
};

var postAdminScreenDetails = function postAdminScreenDetails(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['screenName', 'screenType', 'noOfSeats'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            res.json(err);
        } else {
            var tableName = 'admin_setting_screen';

            var columns = ['screenName', 'screenType', 'noOfSeats'];

            var values = [req.body.screenName, req.body.screenType, req.body.noOfSeats];

            var result = utils.insertToDB(tableName, columns, values).then(function (success) {
                res.json({
                    message: 'Successfully added a screen',
                    data: success.data
                });
            }, function (errResponse) {
                return next({ message: errResponse.error });
            });

            if (result.hasOwnProperty('error')) {
                return next({
                    message: result.error
                });
            } else if (result.hasOwnProperty('data')) {
                res.json({
                    message: 'Successfully added a screen',
                    data: result.data
                });
            }
        }
        connection.release();
    });
};

module.exports = {
    getAdminScreenDetails: getAdminScreenDetails,
    updateAdminScreenDetails: updateAdminScreenDetails,
    postAdminScreenDetails: postAdminScreenDetails
};
//# sourceMappingURL=screen.controller.js.map