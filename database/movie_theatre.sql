CREATE DATABASE  IF NOT EXISTS `movie_theatre` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `movie_theatre`;
-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: movie_theatre
-- ------------------------------------------------------
-- Server version	5.6.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `movie_details`
--

DROP TABLE IF EXISTS `movie_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movie_details` (
  `movie_details_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'List of ID''s',
  `movie_imdbId` varchar(45) NOT NULL,
  `movie_Title` varchar(45) NOT NULL,
  `movie_Rated` varchar(45) NOT NULL,
  `movie_Released` varchar(45) NOT NULL,
  `movie_Runtime` varchar(45) NOT NULL,
  `movie_Genre` varchar(45) NOT NULL,
  `movie_Plot` longtext NOT NULL,
  `movie_imdbVotes` varchar(20) NOT NULL,
  `movie_Poster` varchar(500) NOT NULL,
  `movie_imdbRating` decimal(30,0) NOT NULL,
  `movie_tomatoMeter` varchar(11) NOT NULL,
  `movie_tomatoRating` varchar(10) NOT NULL,
  `movie_tomatoReviews` varchar(11) NOT NULL,
  `movie_tomatoFresh` varchar(11) NOT NULL,
  `movie_tomatoRotten` varchar(11) NOT NULL,
  `movie_tomatoConsensus` varchar(350) NOT NULL,
  `movie_tomatoUserMeter` int(11) NOT NULL,
  `movie_tomatoUserRating` varchar(10) NOT NULL,
  `movie_tomatoUserReviews` varchar(10) NOT NULL,
  `movie_tomatoURL` varchar(45) NOT NULL,
  `movie_trailer` varchar(500) NOT NULL,
  PRIMARY KEY (`movie_details_id`),
  UNIQUE KEY `movie_imdbId_UNIQUE` (`movie_imdbId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Stores the comple movie details and the screen on which it is currently showing';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'movie_theatre'
--

--
-- Dumping routines for database 'movie_theatre'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-15  1:05:53
