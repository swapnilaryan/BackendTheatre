/**
 * Created by swapnil on 12/02/18.
 */
'use strict';

import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from '../../services/utils.service';

let getAdminScreenDetails = (req, res, next) => {
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: utils.jsonResponse(err)
            });
        } else {
            connection.query('SELECT * FROM ??', ['admin_setting_screen'],
                (err, rows) => {
                    if (err) {
                        next({
                            message: utils.jsonResponse(err)
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

let updateAdminScreenDetails = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['screenName', 'screenType', 'noOfSeats'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: utils.jsonResponse(checkReqBody.message)});
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            res.json(err);
        } else {
            let query = 'UPDATE ?? SET screenName=?, screenType=?, noOfSeats=? ' +
                'WHERE ??=?';
            let values = ['admin_setting_screen', req.body.screenName,
                req.body.screenType, req.body.noOfSeats, 'screenName',
                req.body.screenName];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, values, function (err, rows) {
                if (err) {
                    next({
                        message: utils.jsonResponse(err)
                    });
                } else {
                    getAdminScreenDetails(req, res, next);
                }
            });
        }
        connection.release();
    });
};

let postAdminScreenDetails = (req, res, next) => {
// Check for mandatory fields
    let mandatoryFields = ['screenName', 'screenType', 'noOfSeats'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: utils.jsonResponse(checkReqBody.message)});
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            res.json(err);
        } else {
            let tableName = 'admin_setting_screen';

            let columns = ['screenName', 'screenType', 'noOfSeats'];

            let values = [req.body.screenName, req.body.screenType, req.body.noOfSeats];

            let result = utils.insertToDB(tableName, columns, values)
                .then((success) => {
                    res.json({
                        message: 'Successfully added a screen',
                        data: success.data
                    });
                }, (errResponse) => {
                    return next({message: utils.jsonResponse(errResponse.error)});
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
