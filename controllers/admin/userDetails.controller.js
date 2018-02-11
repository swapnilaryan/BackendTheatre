/**
 * Created by swapnil on 10/02/18.
 */
'use strict';
import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from "../../services/utils.service";
const config = require('../../config');
const bcrypt = require('bcrypt');

let getAdminUserUserByEmailID = (req, res, next) => {
    let query = 'SELECT * FROM ?? WHERE adminUserEmail = ?';
    let table = ['admin_user', (req.body.emailID).toLowerCase()];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection((err, connection) => {
        if (err) {
            next({error: err});
        } else {
            connection.query(query, (err, rows) => {
                if (err) {
                    next({error: err});
                } else {
                    res.json({
                        message: 'success',
                        data: rows[0]
                    });
                }
            });
        }
        connection.release();
    });
};

let getCurrentLoggedInUser = (req, res, next) => {
    if (!req.session.user) {
        next({
            message: 'Please log in to continue.'
        });
    } else {
        res.json({
            message: 'Success',
            data: req.session.user
        });
    }
};

/**
 * Sample request
    {
        "adminUserID":"HyGHKGgUG",
        "adminUserName":"Swapnil Kumar",
        "adminUserEmail":"swapnilaryan.nsk@gmail.com",
        "password":"father",
        "confirmPassword":"father"
    }
 * @param req
 * @param res
 * @param next
 */
let updateUser = (req, res, next) => {
    // Check for mandatory fields
    let mandatoryFields = ['adminUserID', 'adminUserName', 'adminUserEmail',
        'password', 'confirmPassword'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: checkReqBody.message});
    }

    let passwordsMatch;
    let salt = bcrypt.genSaltSync(config.app.bcryptSalt);
    let hashPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPassword;
    passwordsMatch = bcrypt.compareSync(req.body.confirmPassword, hashPassword);
    if (!passwordsMatch) {
        next({
            message: 'Passwords don\'t match.',
        });
    } else {
        let query = 'UPDATE ?? SET ??=?, ??=?, ??=?, ??=? WHERE ??=?';
        let table = ['admin_user', 'adminUserID', req.body.adminUserID, 'adminUserName',
            req.body.adminUserName,
            'adminUserEmail', (req.body.adminUserEmail).toLowerCase(),
            'adminUserPassword', req.body.password, 'adminUserEmail',
            (req.body.adminUserEmail).toLowerCase()
        ];
        query = mysqlDetails.mysqlFormat(query, table);
        mysqlDetails.pool.getConnection(function (err, connection) {
            if (err) {
                next({
                    message: err
                });
            } else {
                connection.query(query, (err, rows) => {
                    if (err) {
                        next({
                            message: err
                        });
                    } else {
                        res.json({
                            message: 'User updated Successfully',
                            details: rows[0]
                        });
                    }
                });
            }
            connection.release();
        });
    }
};
module.exports = {
    getAdminUserUserByEmailID: getAdminUserUserByEmailID,
    getCurrentLoggedInUser: getCurrentLoggedInUser,
    updateUser: updateUser
};
