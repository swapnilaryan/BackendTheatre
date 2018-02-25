/**
 * Created by swapnil on 09/02/18.
 */
'use strict';

import * as mysqlDetails from '../../database/connectMySQL';
import * as utils from '../../services/utils.service';
import * as redis from '../../redis/redis.connect';
const moment = require('moment');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const config = require('../../config');

let salt = bcrypt.genSaltSync(config.app.bcryptSalt);
// GET and POST Admin User Login and Registration
// 1. Registration
/**
 * Sample request
 * {
	"adminUserEmail" : "swapnilaryan.nsk93@gmail.com",
	"adminUserName":"Swapnil nskq",
	"adminPassword": "father",
	"adminConfirmPassword": "father1"
    }
 * @param req mandatory fields 'adminUserEmail', 'adminUserName', 'adminPassword',
 * 'adminConfirmPassword'
 * @param res
 * @param next for error handling
 */
let register = (req, res, next) => {
    // Step 1: Check if user already exists
    // Check for mandatory fields
    let mandatoryFields = ['adminUserEmail', 'adminUserName', 'adminPassword',
        'adminConfirmPassword'];
    let checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({message: utils.jsonResponse(checkReqBody.message)});
    }

    let userExists = 0;
    let query = 'SELECT COUNT(*) as UserExists FROM ?? WHERE adminUserEmail = ?';
    let table = ['admin_user', (req.body.adminUserEmail).toLowerCase()];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection((err, connection) => {
        if (err) {
            return next({message: utils.jsonResponse(err)});
        } else {
            connection.query(query, (err, rows) => {
                if (err) {
                    return next({message: utils.jsonResponse(err)});
                } else {
                    userExists = rows[0].UserExists;
                    if (!userExists) {
                        let passwordsMatch;
                        let hashPassword = bcrypt.hashSync(
                            req.body.adminPassword, salt);
                        // creating on the fly doesn't come in the request body
                        req.body.adminUserID = shortid.generate();
                        req.body.password = hashPassword;
                        passwordsMatch = bcrypt.compareSync(
                            req.body.adminConfirmPassword, hashPassword);
                        if (!passwordsMatch) {
                            return next({
                                'message': 'Passwords don\'t match',
                            });
                        } else {
                            let tableName = 'admin_user';

                            let columns = ['adminUserID', 'adminUserName',
                                'adminUserEmail', 'adminUserPassword'];

                            let values = [req.body.adminUserID, req.body.adminUserName,
                                (req.body.adminUserEmail).toLowerCase(),
                                hashPassword];

                            let result = utils.insertToDB(tableName, columns, values)
                                .then((success) => {
                                    res.json({
                                        message: 'User Registered Successfully',
                                        data: success.data
                                    });
                                }, (errResponse) => {
                                    return next({message: utils.jsonResponse(errResponse.error)});
                                });

                            // if (result.hasOwnProperty('error')) {
                            //     return next({
                            //         message: result.error
                            //     });
                            // } else if (result.hasOwnProperty('data')) {
                            //     res.json({
                            //         message: 'User created successfully',
                            //         data: result.data
                            //     });
                            // }
                        }
                    } else {
                        return next({
                            message: 'User ' +
                            (req.body.adminUserEmail).toLowerCase() +
                            ' already exists please login to continue'
                        });
                    }
                }
            });
        }
        connection.release();
    });
};

/**
 * Sample request
 * {
	"adminUserEmail":"swapnilaryan1@gmail.com",
	"adminUserPassword":"father"
    }
 * @param req adminUserEmail, adminUserPassword
 * @param res
 * @param next
 */
let login = (req, res, next) => {
    let matchPassword;
    let query = 'SELECT * FROM ?? WHERE adminUserEmail = ?';
    let table = ['admin_user', (req.body.adminUserEmail).toLowerCase()];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection((err, connection) => {
        if (err) {
            return next({message: utils.jsonResponse(err)});
        } else {
            connection.query(query, (err, rows) => {
                if (err) {
                    return next({message: utils.jsonResponse(err)});
                } else {
                    // User found! check for password authentication.
                    if (rows.length > 0) {
                        matchPassword = rows[0].adminUserPassword;

                        let isMatch = bcrypt.compareSync(req.body.adminUserPassword,
                            matchPassword);

                        if (isMatch) {
                            req.session.user = rows[0];
                            req.session.cookie.user = rows[0];
                            req.cookies.user = rows[0];
                            req.session.save();
                            // TODO experiment later
                            redis.redisClient.set('sess:' + req.sessionID, JSON.stringify(req.session),
                                (err, reply) => {
                                    if (err || !reply) {
                                        next({
                                            message: utils.jsonResponse(err)
                                        });
                                    } else {
                                        console.log(reply)
                                    }
                                });
                            res.json({
                                message: 'Logged in Successfully',
                                data: rows[0]
                            });
                        } else {
                            return next({message: 'Wrong Password! Please try again'});
                        }
                    } else {
                        /** @namespace req.body.adminUserEmail */
                        return next({
                            message: 'Email ID ' + req.body.adminUserEmail +
                            ' doesn\'t exist'
                        });
                    }
                }
            });
        }
        connection.release();
    });
};

let logout = (req, res, next) => {
    // if (req.session.user && req.cookies.userSID) {
    //     req.session.destroy((err) => {
    //         if (err) {
    //             return next({
    //                 message: utils.jsonResponse(err)
    //             });
    //         } else {
    //             res.clearCookie('userSID');
    //             res.json({
    //                 message: 'Successfully logged out'
    //             });
    //         }
    //     });
    // } else {
    //     res.clearCookie('userSID');
    //     res.json({
    //         message: 'Already logged out'
    //     });
    // }

    // TODO redis experiment later
    redis.redisClient.get('sess:' + req.sessionID, (err, reply) => {
        if (err || !reply) {
            next({
                message: 'Logged out. Please log in to continue.',
                status: 401
            });
        } else {
            redis.redisClient.del('sess:' + req.sessionID, (err, reply) => {
                if (err) {
                    next({message: utils.jsonResponse(err)});
                } else {
                    res.json({
                        message: 'Successfully logged out.'
                    });
                }
            });
        }
    });



};

let loginTest = (req, res, next) => {
    res.json({
        messgae: 'Logged in ',
        user: req.session
    });
};

let loginStatus = (req, res, next) => {

    // if (req.session.user && req.cookies.userSID) {
    //     // Logged in
    //     next();
    // } else {
    //     next({
    //         message: 'Logged out. Please log in to continue.',
    //         status: 401
    //     });
    //
    // }

    // TODO experiment later
    redis.redisClient.get('sess:' + req.sessionID, (err, reply) => {
        if (err || !reply) {
            next({
                message: 'Logged out. Please log in to continue.',
                status: 401
            });
        } else {
            next();
        }
    });
};


module.exports = {
    register: register,
    logout: logout,
    login: login,
    loginTest: loginTest,
    loginStatus: loginStatus
};
