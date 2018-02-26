/**
 * Created by swapnil on 09/02/18.
 */
// config.js omdb api key 38b3b14a
const env = process.env.NODE_ENV; // 'dev' or 'test'

const imageSizes = {
    'backdrop_sizes': [
        'w300',
        'w780',
        'w1280',
        'original'
    ],
    'logo_sizes': [
        'w45',
        'w92',
        'w154',
        'w185',
        'w300',
        'w500',
        'original'
    ],
    'poster_sizes': [
        'w92',
        'w154',
        'w185',
        'w342',
        'w500',
        'w780',
        'original'
    ],
    'profile_sizes': [
        'w45',
        'w185',
        'h632',
        'original'
    ],
    'still_sizes': [
        'w92',
        'w185',
        'w300',
        'original'
    ]
};

const development = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 9000,
        cookieMaxAge: 2628000000,
        cookieSecret: 'qwerty',
        bcryptSalt: 10,
        theMovieDBKey: '2c9306d42037dfb0de0fc3f153819054',
        omdbAPIKey: 'c3ec1184',
        theMovieDBURL: 'http://api.themoviedb.org/3',
        responseTimeout: 10000
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 3306,
        dbName: process.env.DEV_DB_NAME || 'movie_theatre',
        user: process.env.DEV_DB_USER || 'root',
        password: process.env.DEV_DB_PASSWORD || 'root',
        debug: process.env.DEV_DB_DEBUG || false,
        socketPath: process.env.DEV_DB_SOCKETPATH || ''
    },
    redis: {
        host: process.env.DEV_REDIS_HOST || 'localhost',
        port: parseInt(process.env.DEV_REDIS_PORT) || 6379,
        ttl: process.env.DEV_REDIS_TTL || 86400,
    }
};
const production = {
    app: {
        port: parseInt(process.env.PROD_APP_PORT) || 9000,
        cookieMaxAge: 2628000000,
        cookieSecret: 'qwerty',
        bcryptSalt: 10,
        theMovieDBKey: '2c9306d42037dfb0de0fc3f153819054',
        omdbAPIKey: 'c3ec1184',
        theMovieDBURL: 'http://api.themoviedb.org/3',
        responseTimeout: 10000
    },
    db: {
        host: process.env.PROD_DB_HOST || 'localhost',
        port: parseInt(process.env.PROD_DB_PORT) || 3306,
        dbName: process.env.PROD_DB_NAME || 'movie_theatre',
        user: process.env.PROD_DB_USER || 'root',
        password: process.env.PROD_DB_PASSWORD || 'root',
        debug: process.env.PROD_DB_DEBUG || false,
        socketPath: process.env.PROD_DB_SOCKETPATH || '/var/run/mysqld/mysqld.sock'
    },
    redis: {
        host: process.env.PROD_REDIS_HOST || 'localhost',
        port: parseInt(process.env.PROD_REDIS_PORT) || 6379,
        ttl: process.env.PROD_REDIS_TTL || 86400,
    }
};

const config = {
    development,
    production
};

module.exports = config[env];
