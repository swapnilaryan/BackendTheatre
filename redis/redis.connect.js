/**
 * Created by swapnil on 25/02/18.
 */
'use strict';

const redis = require('redis');
const session = require('express-session');
const REDISSTORE = require('connect-redis')(session);
const redisClient = redis.createClient();
const config = require('../config');

let resiStore = new REDISSTORE({
    host: config.redis.host,
    port: config.redis.port,
    client: redisClient,
    ttl: config.redis.ttl
});

redisClient.on('connect', () => {
    console.log('Redis Connected');
});

module.exports = {
    redisStore: resiStore,
    redisClient: redisClient
};
