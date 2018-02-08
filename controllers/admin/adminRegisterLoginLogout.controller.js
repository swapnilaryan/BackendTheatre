/**
 * Created by swapnil on 09/02/18.
 */
'use strict';

import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from '../../services/utils.service';
const bcrypt = require('bcrypt');
const shortid = require('shortid');


// GET and POST Admin User Login and Registration
// 1. Registration

let insertNewAdminUser = (req, res, next) => {
    let query = 'INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)';
    let table = ['admin_user', 'adminUserID', 'adminUserName', 'adminUserEmail', 'adminUserPassword',
        req.body.adminUserID, req.body.adminUserName, (req.body.adminUserEmail).toLowerCase(), req.body.adminPassword
    ];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            return next({
                'message': 'Error occurred! ' + err,
            })
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    return next({
                        'message': 'Error occurred! ' + err,
                    })
                } else {
                    res.json({
                        'Message': 'User created Successfully',
                        'Details': rows[0],
                        'Status': 'Success'
                    });
                    console.log('Success');
                }
            });
        }
        connection.release();
    });
};
/**
 *
 * @param req
 * @param res
 * @param next
 */
let register = (req, res, next) => {
    // Step 1: Check if user already exists
    console.log(req.body);
    // Check for mandatory fields
    let mandatoryFields = ['adminUserEmail', 'adminUserName', 'adminPassword', 'adminConfirmPassword'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: checkReqBody.message});
    }

    let userExists = 0;
    let query = 'SELECT COUNT(*) as UserExists FROM ?? WHERE adminUserEmail = ?';
    let table = ['admin_user', (req.body.adminUserEmail).toLowerCase()];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection((err, connection) => {
        if (err) {
            return next({message: err});
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    return next({message: err});
                } else {
                    userExists = rows[0].UserExists;
                    if (!userExists) {
                        let passwordsMatch;
                        let salt = bcrypt.genSaltSync(10);
                        let hashPassword = bcrypt.hashSync(req.body.adminPassword, salt);
                        req.body.adminUserID = shortid.generate(); // creating on the fly doesn't come in the request body
                        req.body.password = hashPassword;
                        passwordsMatch = bcrypt.compareSync(req.body.adminConfirmPassword, hashPassword);
                        if (!passwordsMatch) {
                            next({
                                'message': 'Passwords don\'t match',
                            })
                        } else {
                            insertNewAdminUser(req, res, next);
                        }
                    } else {
                        return next({
                            'message': 'User ' + (req.body.adminUserEmail).toLowerCase() + ' already exists please login to continue'
                        });
                    }
                }
            });
        }
        connection.release();
    });
};


module.exports = {
    register: register
};
