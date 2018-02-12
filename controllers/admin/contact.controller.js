/**
 * Created by swapnil on 12/02/18.
 */
'use strict';

import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from '../../services/utils.service';

let getAdminContactDetails = (req, res, next) => {
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            connection.query('SELECT * FROM ??', ['admin_setting_contact'],
                (err, rows) => {
                    if (err) {
                        next({
                            message: err
                        });
                    } else {
                        res.json({
                            message: 'Successfully fetched contact details',
                            data: rows[0]
                        });
                    }
                });
        }
        connection.release();
    });
};

let updateAdminContactDetails = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['contactName', 'contactEmail', 'contactPhone', 'contactID'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: checkReqBody.message});
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            res.json(err);
        } else {
            let query = 'UPDATE ?? SET contactName=?, contactEmail=?, contactPhone=?' +
                ' WHERE ??=?';
            let values = ['admin_setting_contact', req.body.contactName,
                req.body.contactEmail, req.body.contactPhone, 'contactID',
                req.body.contactID
            ];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, values, function (err, rows) {
                if (err) {
                    next({
                        message: err
                    });
                } else {
                    connection.query('SELECT * FROM ??', ['admin_setting_contact'],
                        (err, rows) => {
                        if (err) {
                            next({
                                message: err
                            });
                        } else {
                            res.json({
                                message: 'Successfully updated contact details',
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
    getAdminContactDetails: getAdminContactDetails,
    updateAdminContactDetails: updateAdminContactDetails
};
