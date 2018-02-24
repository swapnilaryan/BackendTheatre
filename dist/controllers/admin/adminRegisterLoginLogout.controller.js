/**
 * Created by swapnil on 09/02/18.
 */
'use strict';

var _connectMySQL = require('../../database/connectMySQL');

var mysqlDetails = _interopRequireWildcard(_connectMySQL);

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var moment = require('moment');
var bcrypt = require('bcrypt');
var shortid = require('shortid');
var config = require('../../config');

var salt = bcrypt.genSaltSync(config.app.bcryptSalt);
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
var register = function register(req, res, next) {
    // Step 1: Check if user already exists
    // Check for mandatory fields
    var mandatoryFields = ['adminUserEmail', 'adminUserName', 'adminPassword', 'adminConfirmPassword'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    var userExists = 0;
    var query = 'SELECT COUNT(*) as UserExists FROM ?? WHERE adminUserEmail = ?';
    var table = ['admin_user', req.body.adminUserEmail.toLowerCase()];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            return next({ message: err });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    return next({ message: err });
                } else {
                    userExists = rows[0].UserExists;
                    if (!userExists) {
                        var passwordsMatch = void 0;
                        var hashPassword = bcrypt.hashSync(req.body.adminPassword, salt);
                        // creating on the fly doesn't come in the request body
                        req.body.adminUserID = shortid.generate();
                        req.body.password = hashPassword;
                        passwordsMatch = bcrypt.compareSync(req.body.adminConfirmPassword, hashPassword);
                        if (!passwordsMatch) {
                            return next({
                                'message': 'Passwords don\'t match'
                            });
                        } else {
                            var tableName = 'admin_user';

                            var columns = ['adminUserID', 'adminUserName', 'adminUserEmail', 'adminUserPassword'];

                            var values = [req.body.adminUserID, req.body.adminUserName, req.body.adminUserEmail.toLowerCase(), hashPassword];

                            var result = utils.insertToDB(tableName, columns, values).then(function (success) {
                                res.json({
                                    message: 'User Registered Successfully',
                                    data: success.data
                                });
                            }, function (errResponse) {
                                return next({ message: errResponse.error });
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
                            message: 'User ' + req.body.adminUserEmail.toLowerCase() + ' already exists please login to continue'
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
var login = function login(req, res, next) {
    var matchPassword = void 0;
    var query = 'SELECT * FROM ?? WHERE adminUserEmail = ?';
    var table = ['admin_user', req.body.adminUserEmail.toLowerCase()];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            return next({ message: err });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    return next({ message: err });
                } else {
                    // User found! check for password authentication.
                    if (rows.length > 0) {
                        matchPassword = rows[0].adminUserPassword;

                        var isMatch = bcrypt.compareSync(req.body.adminUserPassword, matchPassword);

                        if (isMatch) {
                            req.session.user = rows[0];
                            req.session.cookie.user = rows[0];
                            req.cookies.user = rows[0];
                            req.session.save();
                            res.json({
                                message: 'Logged in Successfully',
                                data: rows[0]
                            });
                        } else {
                            return next({ message: 'Wrong Password! Please try again' });
                        }
                    } else {
                        return next({
                            message: 'Email ID ' + req.body.adminUserEmail + ' doesn\'t exist'
                        });
                    }
                }
            });
        }
        connection.release();
    });
};

var logout = function logout(req, res, next) {
    if (req.session.user && req.cookies.userSID) {
        req.session.destroy(function (err) {
            if (err) {
                return next({
                    message: err
                });
            } else {
                res.clearCookie('userSID');
                res.json({
                    message: 'Successfully logged out'
                });
            }
        });
    } else {
        res.clearCookie('userSID');
        res.json({
            message: 'Already logged out'
        });
    }
};

var loginTest = function loginTest(req, res) {
    res.json({ user: req.session });
};

var loginStatus = function loginStatus(req, res, next) {
    if (req.session.user && req.cookies.userSID) {
        // Logged in
        next();
    } else {
        next({
            message: 'Logged out. Please log in to continue.',
            status: 401
        });
    }
};

module.exports = {
    register: register,
    logout: logout,
    login: login,
    loginTest: loginTest,
    loginStatus: loginStatus
};
//# sourceMappingURL=adminRegisterLoginLogout.controller.js.map