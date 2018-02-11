/**
 * Created by swapnil on 11/02/18.
 */
'use strict';
import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from '../../services/utils.service';

let getSiteConfig = (req, res, next) => {
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            connection.query('SELECT * from ?? where ?? = \'userID_1\'',
                ['admin_site_configuration', 'siteAdminID'],
                (err, rows) => {
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
let updateSiteConfig = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['siteAdminID',
        'theatreName', 'theatreURL', 'siteTimeZone', 'day', 'openTime', 'closeTime'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: checkReqBody.message});
    }

    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({
                message: err
            });
        } else {
            req.body.siteAdminID = 'userID_1'; // Needs to change
            let query = 'UPDATE ?? SET ' +
                'siteAdminID=?, theatreName=?, theatreURL=?, ' +
                'siteTimeZone=?,day=?, openTime=?, closeTime=? ' +
                'WHERE ?? = ? AND day=?';

            let values = ['admin_site_configuration',
                req.body.siteAdminID, req.body.theatreName, req.body.theatreURL,
                req.body.siteTimeZone, req.body.day, req.body.openTime,
                req.body.closeTime, 'site_config_ID', req.body.siteConfigID,
                req.body.day
            ];
            query = mysqlDetails.mysqlFormat(query, values);
            connection.query(query, (err, rows) => {
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
