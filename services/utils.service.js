/**
 * Created by swapnil on 09/02/18.
 */
'use strict';
import * as mysqlDetails from '../database/connectMySQL';


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

    let table = [tableName];
    table.concat(columns).concat(values);
    let query = mysqlDetails.mysqlFormat(insertQuery, table);
    return mysqlDetails.pool.getConnection((err, connection) => {
        if (err) {
            return {error: err};
        } else {
            connection.query(query, (err, rows) => {
                if (err) {
                    return {error: err};
                } else {
                    return {
                        data: rows[0]
                    };
                }
            });
        }
        connection.release();
    });

};

const utils = {
    checkMandatoryRequestBody: checkMandatoryRequestBody,
    insertToDB: insertToDB
};

module.exports = utils;
