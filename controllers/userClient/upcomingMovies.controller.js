/**
 * Created by swapnil on 13/03/18.
 */
'use strict';

import * as mysqlDetails from '../../database/connectMySQL';
const config = require('../../config');


class UpComingMovies {
	getUpComingMovies(req, res, next) {
		let query = 'SELECT * FROM ?? WHERE ?? BETWEEN ' +
			'((DATE_SUB( CURDATE() ,INTERVAL -1 DAY))) AND ' +
			'(DATE_SUB( CURDATE() ,INTERVAL -300 DAY)) AND ??=1  ORDER BY ??' +
			' ASC';
		let table = ['admin_upcomingmovies', 'upReleaseDate', 'upAddByAdmin', 'upReleaseDate'];

		// let query = 'SELECT * FROM ?? WHERE ??=1';
		// let table = ['admin_upcomingmovies', 'upAddByAdmin'];
		query = mysqlDetails.mysqlFormat(query, table);
		mysqlDetails.pool.getConnection(function (err, connection) {
			if (err) {
				next({error: err});
			} else {
				connection.query(query, function (err, rows) {
					if (err) {
						next({error: err});
					} else {
						res.json({
							message: 'success',
							data: rows
						});
					}
				});
			}
			connection.release();
		});
	}
}

module.exports = new UpComingMovies();
