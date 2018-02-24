/**
 * Created by swapnil on 10/02/18.
 */
'use strict';

var _connectMySQL = require('../../database/connectMySQL');

var mysqlDetails = _interopRequireWildcard(_connectMySQL);

var _utils = require('../../services/utils.service');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var config = require('../../config');
var bcrypt = require('bcrypt');

var getAdminUserUserByEmailID = function getAdminUserUserByEmailID(req, res, next) {
    var query = 'SELECT * FROM ?? WHERE adminUserEmail = ?';
    var table = ['admin_user', req.body.emailID.toLowerCase()];
    query = mysqlDetails.mysqlFormat(query, table);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            next({ error: err });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    next({ error: err });
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

var getCurrentLoggedInUser = function getCurrentLoggedInUser(req, res, next) {
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
var updateUser = function updateUser(req, res, next) {
    // Check for mandatory fields
    var mandatoryFields = ['adminUserID', 'adminUserName', 'adminUserEmail', 'password', 'confirmPassword'];
    var checkReqBody = utils.checkMandatoryRequestBody(req.body, mandatoryFields);
    if (checkReqBody.message !== 'success') {
        return next({ message: checkReqBody.message });
    }

    var passwordsMatch = void 0;
    var salt = bcrypt.genSaltSync(config.app.bcryptSalt);
    var hashPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPassword;
    passwordsMatch = bcrypt.compareSync(req.body.confirmPassword, hashPassword);
    if (!passwordsMatch) {
        next({ message: 'Passwords don\'t match.' });
    } else {
        var query = 'UPDATE ?? SET ??=?, ??=?, ??=?, ??=? WHERE ??=?';
        var table = ['admin_user', 'adminUserID', req.body.adminUserID, 'adminUserName', req.body.adminUserName, 'adminUserEmail', req.body.adminUserEmail.toLowerCase(), 'adminUserPassword', req.body.password, 'adminUserEmail', req.body.adminUserEmail.toLowerCase()];
        query = mysqlDetails.mysqlFormat(query, table);
        mysqlDetails.pool.getConnection(function (err, connection) {
            if (err) {
                next({
                    message: err
                });
            } else {
                connection.query(query, function (err, rows) {
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
//# sourceMappingURL=userDetails.controller.js.map