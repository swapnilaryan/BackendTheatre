/**
 * Created by swapnil on 12/02/18.
 */
'use strict';

var _connectMySQL = require('../../database/connectMySQL');

var mysqlDetails = _interopRequireWildcard(_connectMySQL);

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getAdminSocialDetails = function getAdminSocialDetails(req, res, next) {
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            connection.query('SELECT * FROM ??', ['admin_setting_social'], function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    res.json({
                        message: 'Successfully fetched social details',
                        data: rows[0]
                    });
                }
            });
        }
        connection.release();
    });
};

var updateAdminSocialDetails = function updateAdminSocialDetails(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['socialFacebook', 'socialTwitter', 'socialID'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            res.json(err);
        } else {
            var query = 'UPDATE ?? SET socialFacebook=?, socialTwitter=? WHERE ??=?';
            var values = ['admin_setting_social', req.body.socialFacebook, req.body.socialTwitter, 'socialID', req.body.socialID];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, values, function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    connection.query('SELECT * FROM ??', ['admin_setting_social'], function (err, rows) {
                        if (err) {
                            next({
                                message: err
                            });
                        } else {
                            res.json({
                                message: 'Successfully updated social details',
                                data: rows[0]
                            });
                        }
                    });
                }
            });
        }
        connection.release();
    });
};

module.exports = {
    getAdminSocialDetails: getAdminSocialDetails,
    updateAdminSocialDetails: updateAdminSocialDetails
};
//# sourceMappingURL=social.controller.js.map