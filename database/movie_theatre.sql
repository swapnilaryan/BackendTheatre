-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2016 at 02:50 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_theatre`
--

-- --------------------------------------------------------

--
-- Table structure for table `movie_details`
--

DROP TABLE IF EXISTS `movie_details`;
CREATE TABLE IF NOT EXISTS `movie_details` (
  `movie_details_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'List of ID''s',
  `movie_imdbId` varchar(45) NOT NULL,
  `movie_Title` varchar(45) NOT NULL,
  `movie_Year` int(11) NOT NULL,
  `movie_Rated` varchar(45) NOT NULL,
  `movie_Released` varchar(45) NOT NULL,
  `movie_Runtime` varchar(45) NOT NULL,
  `movie_Genre` varchar(45) NOT NULL,
  `movie_Plot` longtext NOT NULL,
  `movie_imdbVotes` varchar(20) NOT NULL,
  `movie_Poster` varchar(500) NOT NULL,
  `movie_imdbRating` varchar(30) NOT NULL,
  `movie_tomatoMeter` varchar(11) NOT NULL,
  `movie_tomatoRating` varchar(10) NOT NULL,
  `movie_tomatoReviews` varchar(11) NOT NULL,
  `movie_tomatoFresh` varchar(11) NOT NULL,
  `movie_tomatoRotten` varchar(11) NOT NULL,
  `movie_tomatoConsensus` varchar(350) NOT NULL,
  `movie_tomatoUserMeter` varchar(11) NOT NULL,
  `movie_tomatoUserRating` varchar(10) NOT NULL,
  `movie_tomatoUserReviews` varchar(10) NOT NULL,
  `movie_tomatoURL` varchar(300) NOT NULL,
  `movie_trailer` varchar(500) NOT NULL,
  PRIMARY KEY (`movie_details_id`),
  UNIQUE KEY `movie_imdbId_UNIQUE` (`movie_imdbId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='Stores the comple movie details and the screen on which it is currently showing';

--
-- Dumping data for table `movie_details`
--

INSERT INTO `movie_details` (`movie_details_id`, `movie_imdbId`, `movie_Title`, `movie_Year`, `movie_Rated`, `movie_Released`, `movie_Runtime`, `movie_Genre`, `movie_Plot`, `movie_imdbVotes`, `movie_Poster`, `movie_imdbRating`, `movie_tomatoMeter`, `movie_tomatoRating`, `movie_tomatoReviews`, `movie_tomatoFresh`, `movie_tomatoRotten`, `movie_tomatoConsensus`, `movie_tomatoUserMeter`, `movie_tomatoUserRating`, `movie_tomatoUserReviews`, `movie_tomatoURL`, `movie_trailer`) VALUES
(5, 'tt2267968', 'Kung Fu Panda 3', 2016, 'PG', '29 Jan 2016', '95 min', 'Animation, Action, Adventure', 'Continuing his "legendary adventures of awesomeness", Po must face two hugely epic, but different threats: one supernatural and the other a little closer to his home.', '3,207', 'http://ia.media-imdb.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_SX300.jpg', '8.1', '82', '6.6/10', '93', '76', '17', ' Kung Fu Panda 3 boasts the requisite visual splendor, but like its rotund protagonist, this sequel''s narrative is also surprisingly nimble, adding up to animated fun for the whole family.\n ', ' 84', '4.1/5', '  83,827\n', 'http://www.rottentomatoes.com/m/kung_fu_panda_3/', 'https://www.youtube.com/embed?listType=search&list=Kung%20Fu%20Panda%203+Trailer'),
(6, 'tt3110958', 'Now You See Me 2', 2016, 'N/A', '10 Jun 2016', '115 min', 'Action, Comedy, Thriller', 'One year after outwitting the FBI and winning the public''s adulation with their Robin Hood-style magic spectacles, The Four Horsemen resurface for a comeback performance in hopes of ...', 'N/A', 'http://ia.media-imdb.com/images/M/MV5BMjAyMDA0MjQ1MV5BMl5BanBnXkFtZTgwODIxODkyNzE@._V1_SX300.jpg', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '28372', 'http://www.rottentomatoes.com/m/now_you_see_me_the_second_act/', 'https://www.youtube.com/embed?listType=search&list=Now%20You%20See%20Me%202+Trailer'),
(7, 'tt1431045', 'Deadpool', 2016, 'R', '12 Feb 2016', '108 min', 'Action, Adventure, Comedy', 'A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers, adopting the alter ego Deadpool.', '145,561', 'http://ia.media-imdb.com/images/M/MV5BMjQyODg5Njc4N15BMl5BanBnXkFtZTgwMzExMjE3NzE@._V1_SX300.jpg', '8.6', '83', '6.9/10', '236', '197', '39', ' Fast, funny, and gleefully profane, the fourth-wall-busting Deadpool subverts superhero film formula with wildly entertaining -- and decidedly non-family-friendly -- results.\n ', ' 94', '4.5/5', '  132,599\n', 'http://www.rottentomatoes.com/m/deadpool/', 'https://www.youtube.com/embed?listType=search&list=Deadpool+Trailer');

-- --------------------------------------------------------

--
-- Table structure for table `movie_screen_time`
--

DROP TABLE IF EXISTS `movie_screen_time`;
CREATE TABLE IF NOT EXISTS `movie_screen_time` (
  `movie_screen_time_id` int(11) NOT NULL AUTO_INCREMENT,
  `screen_no` int(45) NOT NULL,
  `movie_name` varchar(50) NOT NULL,
  `movie_imdbId` varchar(10) NOT NULL,
  `start_time` varchar(45) NOT NULL,
  `end_time` varchar(45) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`movie_screen_time_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movie_screen_time`
--

INSERT INTO `movie_screen_time` (`movie_screen_time_id`, `screen_no`, `movie_name`, `movie_imdbId`, `start_time`, `end_time`, `date`) VALUES
(1, 2, 'Kung Fu Panda 3', 'tt2267968', '8:30 AM', '11:05 AM', '2016-03-08'),
(2, 6, 'Deadpool', 'tt1431045', '8:30 AM', '11:05 AM', '2016-03-08'),
(3, 1, 'Now You See Me 2', 'tt3110958', '8:30 AM', '11:05 AM', '2016-03-08');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
