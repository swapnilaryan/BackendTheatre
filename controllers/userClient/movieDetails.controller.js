/**
 * Created by swapnil on 14/03/18.
 */
'use strict';

import * as utils from '../../services/utils.service';
import * as mysqlDetails from '../../database/connectMySQL';


class MovieDetails {
	getMovieDetails(req, res, next) {
		// Check for mandatory fields
		let mandatoryFields = ['imdbID'];
		let checkReqBody = utils.checkMandatoryRequestBody(req.params, mandatoryFields);
		if (checkReqBody.message !== 'success') {
			return next({message: utils.jsonResponse(checkReqBody.message)});
		}
		
		let query = 'SELECT mi.* , kim.* FROM ?? as mi ' +
			'LEFT JOIN ?? as kim ' +
			'ON kim.movieKIM_IMDB = mi.infoImdbID ' +
			'WHERE mi.infoImdbID = ?';
		
		let values = ['admin_movieinfo', 'moviekidsinmind', req.params.imdbID];
		query = mysqlDetails.mysqlFormat(query, values);
		console.log(query);
		mysqlDetails.pool.getConnection((err, connection) => {
			if (err) {
				next({
					message: utils.jsonResponse(err)
				});
			} else {
				connection.query(query, (err, rows) => {
					if (err) {
						next({
							message: utils.jsonResponse(err)
						});
					} else {
						res.json({
							message: 'Successfully fetch movie with IMDB ID ' +
							'' + req.params.imdbID,
							data: rows[0]
						});
					}
				});
			}
		});
	}
}

module.exports = new MovieDetails();