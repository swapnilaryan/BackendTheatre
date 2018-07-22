/**
 * Created by swapnil on 13/03/18.
 */
'use strict';

import * as mysqlDetails from '../../database/connectMySQL';
import moment from 'moment';


class NowShowingMovies {
    getNowShowingMovies(req, res, next) {
        let query = 'SELECT DISTINCT a.??, a.??, a.??, a.?? , a.??, a.??, a.?? FROM ?? AS a ' +
            'JOIN ?? AS b WHERE a.??=b.?? ' +
            'HAVING (SELECT COUNT(*) FROM movie_schedule WHERE movieImdbID = a.infoImdbID) > 0 ' +
            'ORDER BY ?? DESC';

        let table = ['infoMovieImdbRating', 'infoMovieInTheatres', 'infoMovieID', 'infoImdbID', 'infoMovieName',
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
                        // Sorting in descending order the release date,
                        // so that it displays the newest on main index
                        for (let i = 0; i < rows.length; i++) {
                            let tempDate = new Date(rows[i].infoMovieInTheatres);
                            rows[i].epochTime = moment(tempDate).valueOf();
                        }
                        rows.sort(function (a, b) {
                            return b.epochTime - a.epochTime;
                        });
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
