/**
 * Created by swapnil on 09/02/18.
 */
'use strict';
const mysql = require('mysql');
const config = require('../config');

/**
 * Create connection for mysql
 */

const mysqlCon = mysql.createPool({
    connectionLimit: 1000,
    queueLimit: 0,
    waitForConnections: true,
    host: config['db'].host,
    user: config['db'].user,
    password: config['db'].password,
    port: config['db'].port,
    database: config['db'].database,
    debug: config['db'].debug,
    socketPath: config['db'].socketPath
});

mysqlCon.getConnection((err, connection) => {
    if (err) throw err;
    console.log('MySQL is Connected!');
});

module.exports = mysqlCon;
