/**
 * Created by swapnil on 09/02/18.
 */
'use strict';
import * as mysqlDetails from '../database/connectMySQL';
const deferred = require('deferred');

let checkMandatoryRequestBody = (requestBody, mandatoryFields) => {
    let reqBodyKeys = Object.keys(requestBody);
    if (!requestBody || reqBodyKeys.length === 0) {
        return {message: 'Request can\'t be empty'};
    }
    let msg;
    for (let i = 0; i < mandatoryFields.length; i++) {
        if (reqBodyKeys.indexOf(mandatoryFields[i]) < 0) {
            msg = mandatoryFields[i] + ' key is missing';
            break;
        }
    }

    if (msg) {
        return {message: msg};
    }
    return {message: 'success'};
};

let insertToDB = (tableName, columns, values) => {
    let defer = deferred();
    // create string like -> INSERT INTO ??(??,??,??,??)
    let insertQuery = 'INSERT INTO ?? (';
    for (let i = 0; i < columns.length; i++) {
        insertQuery = insertQuery + '??';
        if (i < columns.length - 1) {
            insertQuery = insertQuery + ', ';
        } else if (i === columns.length - 1) {
            insertQuery = insertQuery + ') ';
        }
    }

    // VALUES (?,?,?,?)'
    insertQuery = insertQuery + ' VALUES (';
    for (let i = 0; i < values.length; i++) {
        insertQuery = insertQuery + '?';
        if (i < values.length - 1) {
            insertQuery = insertQuery + ', ';
        } else if (i === values.length - 1) {
            insertQuery = insertQuery + ') ';
        }
    }

    // ON Duplicate
    insertQuery = insertQuery + 'ON DUPLICATE KEY UPDATE ';
    let x = 0;
    let updateLength = columns.length;
    let updateRows = [];
    while (x < updateLength) {
        insertQuery = insertQuery + '??' + '=' + '?' + ',';
        updateRows.push(columns[x], values[x]);
        x++;
    }
    insertQuery = insertQuery.slice(0, -1);

    let table = [tableName];
    table = table.concat(columns).concat(values).concat(updateRows);
    let query = mysqlDetails.mysqlFormat(insertQuery, table);
    console.log(query);
    mysqlDetails.pool.getConnection((err, connection) => {
        if (err) {
            defer.reject({error: err});
        } else {
            connection.query(query, (err, rows) => {
                if (err) {
                    defer.reject({error: err});
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

let jsonResponse = (str) => {
    let jsonStr;
    try {
        jsonStr = JSON.parse(str);
    } catch (e) {
        return str;
    }
    return jsonStr;
};
const utils = {
    checkMandatoryRequestBody: checkMandatoryRequestBody,
    insertToDB: insertToDB,
    jsonResponse: jsonResponse
};

module.exports = utils;
