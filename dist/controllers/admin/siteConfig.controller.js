/**
 * Created by swapnil on 11/02/18.
 */
'use strict';

var _connectMySQL = require('../../database/connectMySQL');

var mysqlDetails = _interopRequireWildcard(_connectMySQL);

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getSiteConfig = function getSiteConfig(req, res, next) {
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            connection.query('SELECT * from ?? where ?? = \'userID_1\'', ['admin_site_configuration', 'siteAdminID'], function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    res.json({
                        message: 'Success',
                        data: rows
                    });
                }
            });
        }
        connection.release();
    });
};

// Revisit this page required
var updateSiteConfig = function updateSiteConfig(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['siteAdminID', 'theatreName', 'theatreURL', 'siteTimeZone', 'day', 'openTime', 'closeTime'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            req.body.siteAdminID = 'userID_1'; // Needs to change
            var query = 'UPDATE ?? SET ' + 'siteAdminID=?, theatreName=?, theatreURL=?, ' + 'siteTimeZone=?,day=?, openTime=?, closeTime=? ' + 'WHERE ?? = ? AND day=?';

            var values = ['admin_site_configuration', req.body.siteAdminID, req.body.theatreName, req.body.theatreURL, req.body.siteTimeZone, req.body.day, req.body.openTime, req.body.closeTime, 'site_config_ID', req.body.siteConfigID, req.body.day];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    res.json({
                        message: 'Updated successfully'
                    });
                }
            });
        }
        connection.release();
    });
};

module.exports = {
    getSiteConfig: getSiteConfig,
    updateSiteConfig: updateSiteConfig
};
//# sourceMappingURL=siteConfig.controller.js.map