/**
 * Created by swapnil on 09/02/18.
 */
'use strict';
const mysql = require('mysql');
const config = require('../config');

/** @namespace config.db */
/**
 * Create connection for mysql
 */

const pool = mysql.createPool({
    connectionLimit: 1000,
    queueLimit: 0,
    waitForConnections: true,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    database: config.db.dbName,
    debug: config.db.debug,
    socketPath: config.db.socketPath
});

pool.getConnection((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL is Connected!');
});

module.exports = {
    pool: pool,
    mysqlFormat: mysql.format
};
