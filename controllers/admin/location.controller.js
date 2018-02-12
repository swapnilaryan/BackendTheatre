/**
 * Created by swapnil on 12/02/18.
 */
'use strict';

import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from '../../services/utils.service';

let getAdminLocationDetails = (req, res, next) => {
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            connection.query('SELECT * FROM ??', ['admin_setting_location'],
                (err, rows) => {
                    if (err) {
                        next({
                            message: err
                        });
                    } else {
                        res.json({
                            message: 'Successfully fetched location details',
                            data: rows[0]
                        });
                    }
                });
        }
        connection.release();
    });
};

let updateAdminLocationDetails = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['locationTheatreName', 'locationPhysicalAddress',
        'locationMailingAddress', 'locationID'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: checkReqBody.message});
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            res.json(err);
        } else {
            let query = 'UPDATE ?? SET locationTheatreName=?, locationPhysicalAddress=?, ' +
                'locationMailingAddress=? WHERE ??=?';
            let values = ['admin_setting_location', req.body.locationTheatreName,
                req.body.locationPhysicalAddress, req.body.locationMailingAddress,
                'locationID', req.body.locationID];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, values, function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    connection.query('SELECT * FROM ??', ['admin_setting_location'],
                        (err, rows) => {
                            if (err) {
                                next({
                                    message: err
                                });
                            } else {
                                res.json({
                                    message: 'Successfully updated location details',
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
    getAdminLocationDetails: getAdminLocationDetails,
    updateAdminLocationDetails: updateAdminLocationDetails
};
