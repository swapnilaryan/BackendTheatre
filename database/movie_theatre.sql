-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2016 at 06:32 PM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS `movie_theatre`;
CREATE DATABASE `movie_theatre`;
USE movie_theatre;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='Stores the comple movie details and the screen on which it is currently showing';

--
-- Dumping data for table `movie_details`
--

INSERT INTO `movie_details` (`movie_details_id`, `movie_imdbId`, `movie_Title`, `movie_Year`, `movie_Rated`, `movie_Released`, `movie_Runtime`, `movie_Genre`, `movie_Plot`, `movie_imdbVotes`, `movie_Poster`, `movie_imdbRating`, `movie_tomatoMeter`, `movie_tomatoRating`, `movie_tomatoReviews`, `movie_tomatoFresh`, `movie_tomatoRotten`, `movie_tomatoConsensus`, `movie_tomatoUserMeter`, `movie_tomatoUserRating`, `movie_tomatoUserReviews`, `movie_tomatoURL`, `movie_trailer`) VALUES
(5, 'tt2267968', 'Kung Fu Panda 3', 2016, 'PG', '29 Jan 2016', '95 min', 'Animation, Action, Adventure', 'Continuing his "legendary adventures of awesomeness", Po must face two hugely epic, but different threats: one supernatural and the other a little closer to his home.', '12,433', 'http://ia.media-imdb.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_SX300.jpg', '7.6', '82', '6.6/10', '94', '77', '17', ' Kung Fu Panda 3 boasts the requisite visual splendor, but like its rotund protagonist, this sequel''s narrative is also surprisingly nimble, adding up to animated fun for the whole family.\n ', ' 84', '4.1/5', '  84,799\n', 'http://www.rottentomatoes.com/m/kung_fu_panda_3/', 'https://www.youtube.com/embed?listType=search&list=Kung%20Fu%20Panda%203+Trailer'),
(6, 'tt3110958', 'Now You See Me 2', 2016, 'N/A', '10 Jun 2016', '115 min', 'Action, Comedy, Thriller', 'One year after outwitting the FBI and winning the public''s adulation with their Robin Hood-style magic spectacles, The Four Horsemen resurface for a comeback performance in hopes of ...', 'N/A', 'http://ia.media-imdb.com/images/M/MV5BMjAyMDA0MjQ1MV5BMl5BanBnXkFtZTgwODIxODkyNzE@._V1_SX300.jpg', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '32279', 'http://www.rottentomatoes.com/m/now_you_see_me_the_second_act/', 'https://www.youtube.com/embed?listType=search&list=Now%20You%20See%20Me%202+Trailer'),
(7, 'tt1431045', 'Deadpool', 2016, 'R', '12 Feb 2016', '108 min', 'Action, Adventure, Comedy', 'A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers, adopting the alter ego Deadpool.', '145,561', 'http://ia.media-imdb.com/images/M/MV5BMjQyODg5Njc4N15BMl5BanBnXkFtZTgwMzExMjE3NzE@._V1_SX300.jpg', '8.6', '84', '6.9/10', '243', '203', '40', ' Fast, funny, and gleefully profane, the fourth-wall-busting Deadpool subverts superhero film formula with wildly entertaining -- and decidedly non-family-friendly -- results.\n ', ' 93', '4.4/5', '  138,222\n', 'http://www.rottentomatoes.com/m/deadpool/', 'https://www.youtube.com/embed?listType=search&list=Deadpool+Trailer'),
(8, 'tt4177610', 'The Mermaid from Marbella', 2016, 'PG-13', '01 Dec 2016', 'N/A', 'Adventure, Fantasy, Romance', 'An artist fisherman has an encounter with a singing mermaid from Marbella who''s in tour with a traveling Circus.', 'N/A', 'http://ia.media-imdb.com/images/M/MV5BNTcyODM5MDE4MV5BMl5BanBnXkFtZTgwNzg1NDE0MzE@._V1_SX300.jpg', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'https://www.youtube.com/embed?listType=search&list=The%20Mermaid%20from%20Marbella+Trailer'),
(9, 'tt5274244', 'The Monkey King 2', 2016, 'N/A', '05 Feb 2016', '118 min', 'Action, Adventure, Fantasy', 'When a travelling monk is stranded in a wasteland, The Monkey King must escort him across the land to retrieve sacred scriptures and protect him from an evil demon.', '46', 'http://ia.media-imdb.com/images/M/MV5BNjJmYTUzZjQtMjAxYi00NzMwLTkxNWMtMzBkMWI1YmZmOGVkXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_SX300.jpg', '6.1', '', 'N/A', '4', '4', '0', ' No consensus yet.', ' 52', '3.5/5', '  621\n', 'http://www.rottentomatoes.com/m/the_monkey_king_2_3d/', 'https://www.youtube.com/embed?listType=search&list=The%20Monkey%20King%202+Trailer'),
(10, 'tt5237980', 'From Vegas to Macau III', 2016, 'N/A', '06 Feb 2016', '113 min', 'Comedy, Drama', 'The story of a has-been director looking to re-capture his past glory with an extravagant setting and an ensemble cast with Hong Kong''s A-listers, and a rehashed plot straight from the ...', '2,395', 'http://ia.media-imdb.com/images/M/MV5BYmRlYTI2NDUtMDA1OC00YmRjLTg1YjctNzRiMmEyNTk3NmQzXkEyXkFqcGdeQXVyNjUzMDM5OTM@._V1_SX300.jpg', '1.1', '', 'N/A', '3', '1', '2', ' No consensus yet.', ' 17', '1.5/5', '  64\n', 'http://www.rottentomatoes.com/m/from_vegas_to_macau_3/', 'https://www.youtube.com/embed?listType=search&list=From%20Vegas%20to%20Macau%20III+Trailer'),
(11, 'tt2869728', 'Ride Along 2', 2016, 'PG-13', '15 Jan 2016', '102 min', 'Action, Comedy', 'As his wedding day approaches, Ben heads to Miami with his soon-to-be brother-in-law James to bring down a drug dealer who''s supplying the dealers of Atlanta with product.', '10,186', 'http://ia.media-imdb.com/images/M/MV5BMTU4ODAzMzcxOV5BMl5BanBnXkFtZTgwODkxMDI1NjE@._V1_SX300.jpg', '5.9', '15', '3.8/10', '98', '15', '83', ' Ride Along 2 presents a cop-comedy sequel whose well-matched stars can''t break the law of diminishing returns -- or lock up a script that unabashedly steals from the original.\n ', ' 54', '3.4/5', '  28,989\n', 'http://www.rottentomatoes.com/m/ride_along_2/', 'https://www.youtube.com/embed?listType=search&list=Ride%20Along%202+Trailer'),
(12, 'tt2304933', 'The 5th Wave', 2016, 'PG-13', '22 Jan 2016', '112 min', 'Action, Adventure, Sci-Fi', 'Four waves of increasingly deadly alien attacks have left most of Earth decimated. Cassie is on the run, desperately trying to save her younger brother.', '13,202', 'http://ia.media-imdb.com/images/M/MV5BMjQwOTc0Mzg3Nl5BMl5BanBnXkFtZTgwOTg3NjI2NzE@._V1_SX300.jpg', '5.6', '17', '4.2/10', '118', '20', '98', ' With unimpressive effects and plot points seemingly pieced together from previous dystopian YA sci-fi films, The 5th Wave ends up feeling like more of a limp, derivative wriggle.\n ', ' 48', '3.1/5', '  24,796\n', 'http://www.rottentomatoes.com/m/the_fifth_wave/', 'https://www.youtube.com/embed?listType=search&list=The%205th%20Wave+Trailer'),
(13, 'tt2948356', 'Zootopia', 2016, 'PG', '04 Mar 2016', '108 min', 'Animation, Action, Adventure', 'In a city of anthropomorphic animals, a fugitive con artist fox and a rookie bunny cop must work together to uncover a conspiracy.', '3,192', 'http://ia.media-imdb.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_SX300.jpg', '8.1', '98', '8/10', '126', '124', '2', ' The brilliantly well-rounded Zootopia offers a thoughtful, inclusive message that''s as rich and timely as its sumptuously state-of-the-art animation -- all while remaining fast and funny enough to keep younger viewers entertained.\n ', ' 95', '4.5/5', '  21,362\n', 'http://www.rottentomatoes.com/m/zootopia/', 'https://www.youtube.com/embed?listType=search&list=Zootopia+Trailer'),
(14, 'tt1860213', 'Dirty Grandpa', 2016, 'R', '22 Jan 2016', '102 min', 'Comedy', 'Right before his wedding, an uptight guy is tricked into driving his grandfather, a lecherous former Army Lieutenant-Colonel, to Florida for spring break.', '6,055', 'http://ia.media-imdb.com/images/M/MV5BMzk0NzkyNDk2M15BMl5BanBnXkFtZTgwNDczOTU3NzE@._V1_SX300.jpg', '5.9', '10', '2.8/10', '105', '11', '94', ' Like a Werther''s Original dropped down a sewer drain, Dirty Grandpa represents the careless fumbling of a classic talent that once brought pleasure to millions.\n ', ' 50', '3.2/5', '  24,411\n', 'http://www.rottentomatoes.com/m/dirty_grandpa/', 'https://www.youtube.com/embed?listType=search&list=Dirty%20Grandpa+Trailer'),
(15, 'tt1292566', 'How to Be Single', 2016, 'R', '12 Feb 2016', '110 min', 'Comedy, Romance', 'New York City is full of lonely hearts seeking the right match, and what Alice, Robin, Lucy, Meg, Tom and David all have in common is the need to learn how to be single in a world filled with ever-evolving definitions of love.', '5,292', 'http://ia.media-imdb.com/images/M/MV5BNzI4MDMwMzUwNF5BMl5BanBnXkFtZTgwMDgyNzkyNzE@._V1_SX300.jpg', '6.3', '49', '5.2/10', '120', '59', '61', ' How to Be Single boasts the rough outline of a feminist rom-com, but too willingly indulges in the genre conventions it wants to subvert.\n ', ' 56', '3.4/5', '  20,438\n', 'http://www.rottentomatoes.com/m/how_to_be_single_2016/', 'https://www.youtube.com/embed?listType=search&list=How%20to%20Be%20Single+Trailer'),
(16, 'tt1386697', 'Suicide Squad', 2016, 'N/A', '05 Aug 2016', 'N/A', 'Action, Adventure, Fantasy', 'A secret government agency recruits imprisoned supervillains to execute dangerous black ops missions in exchange for clemency.', 'N/A', 'http://ia.media-imdb.com/images/M/MV5BOTY1MzU1MDQ1MF5BMl5BanBnXkFtZTgwNjAzMjY3NzE@._V1_SX300.jpg', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '8011', 'http://www.rottentomatoes.com/m/suicide_squad_2016/', 'https://www.youtube.com/embed?listType=search&list=Suicide%20Squad+Trailer');

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
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movie_screen_time`
--

INSERT INTO `movie_screen_time` (`movie_screen_time_id`, `screen_no`, `movie_name`, `movie_imdbId`, `start_time`, `end_time`, `date`) VALUES
(1, 2, 'Kung Fu Panda 3', 'tt2267968', '8:30 AM', '11:05 AM', '2016-03-08'),
(2, 6, 'Deadpool', 'tt1431045', '8:30 AM', '11:05 AM', '2016-03-08'),
(3, 1, 'Now You See Me 2', 'tt3110958', '8:30 AM', '11:05 AM', '2016-03-08'),
(4, 18, 'The Mermaid from Marbella', 'tt4177610', '10:00 PM', '11:05 PM', '2016-04-14'),
(5, 11, 'Kung Fu Panda 3', 'tt2267968', '10:00 AM', '11:55 AM', '2016-03-19'),
(6, 1, 'The Mermaid from Marbella', 'tt4177610', '10:00 AM', '11:55 AM', '2016-03-19'),
(7, 3, 'From Vegas to Macau III', 'tt5237980', '12:30 PM', '3:28 PM', '2016-04-15'),
(8, 4, 'Ride Along 2', 'tt2869728', '12:30 PM', '2:57 PM', '2016-03-24'),
(9, 7, 'The 5th Wave', 'tt2304933', '8:15 PM', '11:37 PM', '2016-04-22'),
(10, 8, 'Zootopia', 'tt2948356', '7:30 PM', '10:28 PM', '2016-03-20'),
(11, 10, 'Dirty Grandpa', 'tt1860213', '11:30 PM', '2:27 AM', '2016-03-30'),
(12, 11, 'How to Be Single', 'tt1292566', '3:30 PM', '6:45 PM', '2016-04-01'),
(13, 3, 'Suicide Squad', 'tt1386697', '11:45 PM', '12:55 AM', '2016-03-16'),
(14, 15, 'Deadpool', 'tt1431045', '1:45 PM', '3:53 PM', '2016-03-15'),
(15, 13, 'Deadpool', 'tt1431045', '2:15 PM', '4:53 PM', '2016-03-29');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
