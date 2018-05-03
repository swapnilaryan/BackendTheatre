/**
 * Created by swapnil on 13/03/18.
 */
'use strict';

import * as mysqlDetails from '../../database/connectMySQL';
const config = require('../../config');


class NowShowingMovies {
	getNowShowingMovies(req, res, next) {
		let query = 'SELECT DISTINCT a.??, a.??, a.?? , a.??, a.??, a.?? FROM ?? AS a ' +
			'JOIN ?? AS b WHERE a.??=b.?? ORDER BY ??';

		let table = ['infoMovieInTheatres', 'infoMovieID', 'infoImdbID', 'infoMovieName',
			'infoMoviePosterPath', 'infoMovieBuyTicketsButton',
			'admin_movieinfo', 'movie_schedule', 'infoImdbID', 'movieImdbID', 'infoMovieInTheatres'];
		query = mysqlDetails.mysqlFormat(query, table);
		console.log(query);
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

module.exports = new NowShowingMovies();
