/**
 * Created by swapnil on 12/02/18.
 */

'use strict';

var _connectMySQL = require('../../database/connectMySQL');

var mysqlDetails = _interopRequireWildcard(_connectMySQL);

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getAdminTicketDetails = function getAdminTicketDetails(req, res, next) {
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            var query = 'SELECT  a.*  FROM ?? a JOIN ?? b ' + 'ON a.ticketType = b.ticketType ' + 'WHERE a.ticketDay=b.ticketDay ' + 'GROUP BY a.ticketID';
            var values = ['admin_setting_ticket', 'admin_setting_ticket'];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    var structAppend = [];
                    for (var i = 0; i <= rows.length - 5; i++) {
                        var struct = {
                            day: rows[i].ticketDay,
                            ticketDetails: [{
                                ticketGroup: rows[i].ticketGroup,
                                ticketName: rows[i].ticketName,
                                ticketPrice2D: rows[i].ticketPrice,
                                ticketPrice3D: rows[++i].ticketPrice
                            }, {
                                ticketGroup: rows[++i].ticketGroup,
                                ticketName: rows[i].ticketName,
                                ticketPrice2D: rows[i].ticketPrice,
                                ticketPrice3D: rows[++i].ticketPrice
                            }, {
                                ticketGroup: rows[++i].ticketGroup,
                                ticketName: rows[i].ticketName,
                                ticketPrice2D: rows[i].ticketPrice,
                                ticketPrice3D: rows[++i].ticketPrice
                            }]
                        };
                        structAppend.push(struct);
                    }
                    res.json({
                        message: 'Successfully fetched ticket details',
                        data: structAppend
                    });
                }
            });
        }
        connection.release();
    });
};

var updateAdminTicketDetails = function updateAdminTicketDetails(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['ticketName', 'ticketType', 'ticketPrice', 'ticketGroup', 'ticketDay'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            res.json(err);
        } else {
            var query = 'UPDATE ?? SET ticketName=?, ticketType=?, ticketPrice=?, ' + 'ticketGroup=?, ticketDay=? ' + 'where ??=? AND ??=? AND ??=?';
            var values = ['admin_setting_ticket', req.body.ticketName, req.body.ticketType, req.body.ticketPrice, req.body.ticketGroup, req.body.ticketDay, 'ticketGroup', req.body.ticketGroup, 'ticketType', req.body.ticketType, 'ticketDay', req.body.ticketDay];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, values, function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    getAdminTicketDetails(req, res, next);
                }
            });
        }
        connection.release();
    });
};

module.exports = {
    getAdminTicketDetails: getAdminTicketDetails,
    updateAdminTicketDetails: updateAdminTicketDetails
};
//# sourceMappingURL=ticket.controller.js.map