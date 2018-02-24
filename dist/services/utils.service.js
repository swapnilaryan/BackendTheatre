/**
 * Created by swapnil on 09/02/18.
 */
'use strict';

var _connectMySQL = require('../database/connectMySQL');

var mysqlDetails = _interopRequireWildcard(_connectMySQL);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var deferred = require('deferred');

var checkMandatoryRequestBody = function checkMandatoryRequestBody(requestBody, mandatoryFields) {
    var reqBodyKeys = Object.keys(requestBody);
    if (!requestBody || reqBodyKeys.length === 0) {
        return { message: 'Request can\'t be empty' };
    }
    var msg = void 0;
    for (var i = 0; i < mandatoryFields.length; i++) {
        if (reqBodyKeys.indexOf(mandatoryFields[i]) < 0) {
            msg = mandatoryFields[i] + ' key is missing';
            break;
        }
    }

    if (msg) {
        return { message: msg };
    }
    return { message: 'success' };
};

var insertToDB = function insertToDB(tableName, columns, values) {
    var defer = deferred();
    // create string like -> INSERT INTO ??(??,??,??,??)
    var insertQuery = 'INSERT INTO ?? (';
    for (var i = 0; i < columns.length; i++) {
        insertQuery = insertQuery + '??';
        if (i < columns.length - 1) {
            insertQuery = insertQuery + ', ';
        } else if (i === columns.length - 1) {
            insertQuery = insertQuery + ') ';
        }
    }

    // VALUES (?,?,?,?)'
    insertQuery = insertQuery + ' VALUES (';
    for (var _i = 0; _i < values.length; _i++) {
        insertQuery = insertQuery + '?';
        if (_i < values.length - 1) {
            insertQuery = insertQuery + ', ';
        } else if (_i === values.length - 1) {
            insertQuery = insertQuery + ') ';
        }
    }

    // ON Duplicate
    insertQuery = insertQuery + 'ON DUPLICATE KEY UPDATE ';
    var x = 0;
    var updateLength = columns.length;
    var updateRows = [];
    while (x < updateLength) {
        insertQuery = insertQuery + '??' + '=' + '?' + ',';
        updateRows.push(columns[x], values[x]);
        x++;
    }
    insertQuery = insertQuery.slice(0, -1);

    var table = [tableName];
    table = table.concat(columns).concat(values).concat(updateRows);
    var query = mysqlDetails.mysqlFormat(insertQuery, table);
    console.log(query);
    mysqlDetails.pool.getConnection(function (err, connection) {
        if (err) {
            defer.reject({ error: err });
        } else {
            connection.query(query, function (err, rows) {
                if (err) {
                    defer.reject({ error: err });
                } else {
                    defer.resolve({
                        data: 'success'
                    });
                }
            });
        }
        connection.release();
    });
    return defer.promise;
};

var utils = {
    checkMandatoryRequestBody: checkMandatoryRequestBody,
    insertToDB: insertToDB
};

module.exports = utils;
//# sourceMappingURL=utils.service.js.map