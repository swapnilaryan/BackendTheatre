/**
 * Created by swapnil on 12/02/18.
 */

'use strict';

import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from '../../services/utils.service';

let getAdminTicketDetails = (req, res, next) => {
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: utils.jsonResponse(err)
            });
        } else {
            let query = 'SELECT  a.*  FROM ?? a JOIN ?? b ' +
                'ON a.ticketType = b.ticketType ' +
                'WHERE a.ticketDay=b.ticketDay ' +
                'GROUP BY a.ticketID';
            let values = ['admin_setting_ticket', 'admin_setting_ticket'];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, (err, rows) => {
                if (err) {
                    next({
                        message: utils.jsonResponse(err)
                    });
                } else {
                    let structAppend = [];
                    for (let i = 0; i <= rows.length - 5; i++) {
                        let struct = {
                            day: rows[i].ticketDay,
                            ticketDetails: [
                                {
                                    ticketGroup: rows[i].ticketGroup,
                                    ticketName: rows[i].ticketName,
                                    ticketPrice2D: rows[i].ticketPrice,
                                    ticketPrice3D: rows[++i].ticketPrice
                                },
                                {
                                    ticketGroup: rows[++i].ticketGroup,
                                    ticketName: rows[i].ticketName,
                                    ticketPrice2D: rows[i].ticketPrice,
                                    ticketPrice3D: rows[++i].ticketPrice
                                },
                                {
                                    ticketGroup: rows[++i].ticketGroup,
                                    ticketName: rows[i].ticketName,
                                    ticketPrice2D: rows[i].ticketPrice,
                                    ticketPrice3D: rows[++i].ticketPrice
                                }
                            ]
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

let updateAdminTicketDetails = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['ticketName', 'ticketType', 'ticketPrice', 'ticketGroup',
        'ticketDay'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: utils.jsonResponse(checkReqBody.message)});
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            res.json(err);
        } else {
            let query = 'UPDATE ?? SET ticketName=?, ticketType=?, ticketPrice=?, ' +
                'ticketGroup=?, ticketDay=? ' +
                'where ??=? AND ??=? AND ??=?';
            let values = ['admin_setting_ticket', req.body.ticketName,
                req.body.ticketType, req.body.ticketPrice, req.body.ticketGroup,
                req.body.ticketDay, 'ticketGroup', req.body.ticketGroup, 'ticketType',
                req.body.ticketType, 'ticketDay', req.body.ticketDay];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, values, function (err, rows) {
                if (err) {
                    next({
                        message: utils.jsonResponse(err)
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
