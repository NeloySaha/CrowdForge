-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2023 at 12:15 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uni`
--

-- --------------------------------------------------------

--
-- Table structure for table `club`
--

CREATE TABLE IF NOT EXISTS `club` (
  `name` varchar(50) NOT NULL,
  `full_form` varchar(50) NOT NULL,
  `established_date` date NOT NULL,
  `location` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `announcement_detail` varchar(4000) DEFAULT NULL,
  `announcement_title` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `club`
--

INSERT INTO `club` (`name`, `full_form`, `established_date`, `location`, `description`, `announcement_detail`, `announcement_title`) VALUES
('BUCC', 'BRAC University Computer Club', '2014-10-21', 'ub81205', 'BRAC University Computer Club (BUCC) This club consists of a youthful team of passionate and hardworking Tech Enthusiast students. They strive to learn more about the advanced technologies of the 21st century. The club regularly offers workshops on web development, graphics designing, problem solving, and many other technological fields. To get the students engaging they organize contests on compe', 'Exciting news coming your way! 🚀 Get ready to embark on a journey of fun, laughter, and unforgettable moments. Drumroll, please... 🥁', NULL),
('BUCuC', 'BRAC University Cultural Club', '2014-10-21', 'ub20412', 'Welcome to the vibrant heartbeat of artistic expression and cultural celebration at BRAC University—the BRACU Cultural Club. Our diverse and dynamic community thrives on a fusion of traditions, music, dance, and creativity. Embrace the richness of cultural exchange as we unite students with a passion for the arts. From traditional performances to modern interpretations, join us in fostering a tape', NULL, NULL),
('BUEDF', 'BRAC University Entrepreneurship Development Forum', '2013-01-01', 'ub50506', 'BRAC University Entrepreneurship Development Forum (EDF) was started in January 2004. EDF is the platform for Future Leaders of BRAC University. Entrepreneurship Development Forum (EDF) has been established to unearth the immense hidden potentiality and leadership of the students. The intention behind all the activities of this club is to help its members to sense the enormous latent force they possess. Moreover, complying with the modern day corporate ambiance, team work is emphasized here prior to everything so that the members can feel the bond in the long term when they will enter into the real corporate activities.', NULL, NULL),
('BUFC', 'BRAC University Film Club', '2014-10-21', 'ub50605', 'Lights, camera, action! Welcome to the BRAC University Film Club, where storytelling comes to life on the big screen. Dive into the magic of cinema with fellow enthusiasts who share a passion for the art of filmmaking. From scriptwriting to editing, our club is a creative haven for aspiring directors, actors, and cinematographers. Join us for screenings, discussions, and hands-on projects that nurture your cinematic flair. Whether you\'re an aficionado or a novice, we\'re here to celebrate the diverse world of film and cultivate the next generation of storytellers. Immerse yourself in the reel world at the BRACU Film Club—where every frame tells a story.', NULL, NULL),
('FCBU', 'Football Club Of BRAC University', '2014-10-21', 'ub21405', 'Get ready to lace up your boots and feel the adrenaline on the pitch with the BRAC University Football Club. Our club is more than just a team—it\'s a brotherhood of passionate players united by the love of the beautiful game. Whether you\'re a seasoned striker or a rookie goalie, we welcome all skill levels to join us in the pursuit of victory and camaraderie. Train hard, play harder, and be part of the spirited energy that fuels our football community. Embrace the thrill of the game, forge lasting friendships, and score unforgettable memories at the BRACU Football Club. Kick off your football journey with us!', NULL, NULL),
('MONON', 'BRAC University MONON', '2014-10-21', 'ub21403', 'BRAC UNIVERSITY MONON brings out diversified skills by contemplating non-conventional artistry.', NULL, NULL),
('ROBU', 'Robotics Club Of BRAC University', '2012-09-29', 'ub30303', 'Step into the future with the BRAC University Robotics Club—an innovation hub where curiosity meets cutting-edge technology. Our club is a dynamic platform for aspiring engineers, programmers, and tech enthusiasts to explore the exciting realm of robotics. Dive into hands-on projects, workshops, and competitions that challenge your intellect and fuel your passion for automation. Whether you\'re a seasoned expert or a curious beginner, our community thrives on collaboration and pushing the boundaries of what\'s possible. Join us in building a future where creativity and robotics converge to shape tomorrow\'s world. Unleash your potential with the BRACU Robotics Club!', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `name` varchar(100) NOT NULL,
  `head` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`name`, `head`, `email`) VALUES
('CSE', 'Sadia Kazi', 'cse@bracu.com'),
('EEE', 'Shadman Shahriar', 'shadman@gmail.com'),
('MNS', 'Mostak Ahmed', 'mns@gmail.com'),
('PHY', 'Yousuf Hyder', 'phy@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `event_id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `cost` int(100) NOT NULL,
  `date` date NOT NULL,
  `capacity` int(100) NOT NULL,
  `venue` varchar(100) NOT NULL,
  `club_name` varchar(100) NOT NULL,
  `money_received` int(11) NOT NULL,
  `restriction` tinyint(1) NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `name`, `cost`, `date`, `capacity`, `venue`, `club_name`, `money_received`, `restriction`) VALUES
(1, 'Robo Carnival', 10000, '2023-12-15', 1000, 'UB6', 'ROBU', 2200, 0),
(2, 'Lets Dance', 5000, '2023-12-21', 200, 'UB3', 'BULDF', 4200, 1),
(3, 'BRAC CSE Job Fest', 20000, '2023-12-18', 1000, 'UB2', 'BUCC', 6400, 0),
(4, 'BUCC Freshers Enquee', 15000, '2023-12-10', 500, 'UB2', 'BUCC', 10100, 1),
(5, 'BUCC Winter vibes', 15000, '2023-12-31', 900, 'UB2', 'BUCC', 11500, 1),
(6, 'BUCC Dhumaachale', 10000, '2023-11-16', 200, 'UB9', 'BUCC', 0, 0),
(7, 'BUCC Fair', 10000, '2023-11-17', 200, 'UB9', 'BUCC', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `funding_request`
--

CREATE TABLE IF NOT EXISTS `funding_request` (
  `Sponsor_email` varchar(40) NOT NULL,
  `Event` varchar(40) NOT NULL,
  `Amount` int(40) NOT NULL,
  PRIMARY KEY (`Event`,`Sponsor_email`),
  KEY `Test` (`Sponsor_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `funding_request`
--

INSERT INTO `funding_request` (`Sponsor_email`, `Event`, `Amount`) VALUES
('hasanul@xybank.org', 'BRAC CSE Job Fest', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `incoming_event`
--

CREATE TABLE IF NOT EXISTS `incoming_event` (
  `event_id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `cost` int(100) NOT NULL,
  `date` date NOT NULL,
  `capacity` int(100) NOT NULL,
  `vanue` varchar(100) NOT NULL,
  `club_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `incoming_request`
--

CREATE TABLE IF NOT EXISTS `incoming_request` (
  `name` varchar(110) NOT NULL,
  `designation` varchar(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `department` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `club` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `contact_no` varchar(100) NOT NULL,
  PRIMARY KEY (`email`,`club`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incoming_request`
--

INSERT INTO `incoming_request` (`name`, `designation`, `email`, `dob`, `department`, `gender`, `club`, `password`, `contact_no`) VALUES
('Moju Haque', 'Member', 'moju@gmail.com', '2023-11-02', 'CSE', 'Male', 'BUCC', '12345', '01929121212'),
('Sazin Haque', 'Member', 'sazin@gmail.com', '2023-11-10', 'CSE', 'Male', 'BUCC', '12345', '01829191919');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `name` varchar(110) NOT NULL,
  `designation` varchar(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `department` varchar(11) NOT NULL,
  `gender` varchar(11) NOT NULL,
  `club` varchar(110) NOT NULL,
  `password` varchar(11) NOT NULL,
  `contact_no` varchar(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `evaluation` varchar(1000) DEFAULT NULL,
  `bank account` int(11) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  PRIMARY KEY (`email`,`club`),
  KEY `fk_member_club` (`club`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`name`, `designation`, `email`, `dob`, `department`, `gender`, `club`, `password`, `contact_no`, `rating`, `evaluation`, `bank account`, `money`) VALUES
('Abiiiira', 'hr', 'abira@gmail.com', '2023-11-10', 'MNS', 'Female', 'BUCC', '12345', '01291111111', 0, NULL, NULL, NULL),
('Aboni Rounak', 'advisor', 'aboni@gmail.com', '2003-11-05', 'CSE', 'female', 'BUCC', '12345', '01733433100', 3, NULL, 987654321, 100),
('Aftab', 'general', 'aftab@gmail.com', '2023-11-07', 'CSE', 'Others', 'BUCC', 'aftab123', '01232311212', 8, NULL, NULL, NULL),
('FlexedPanda', 'hr', 'flexed@gmail.com', '2000-04-19', 'CSE', 'male', 'ROBU', '12345', '1987634', 0, NULL, NULL, NULL),
('Ichigo', 'general', 'ichigo@gmail.com', '2023-11-14', 'CSE', 'Male', 'BUCC', 'ichigo123', '01289028928', 4, NULL, NULL, NULL),
('Keka Ferdous', 'general', 'keka@gmail.com', '2023-11-18', 'CSE', 'Female', 'BUCC', '12345', '01232222222', 3, NULL, NULL, NULL),
('Neloy Kumar Saha', 'treasurer ', 'neloy@gmail.com', '2023-11-03', 'CSE', 'Male', 'BUCC', 'neloy123', '1928821212', 5, NULL, 1234567890, 10),
('Niaz', 'president', 'niaznafi@gmail.com', '1999-08-10', 'CSE', 'male', 'BUCC', '12345', '01733433100', 10, NULL, NULL, NULL),
('Vader', 'general', 'president@gmail.com', '2015-08-05', 'CSE', 'male', 'BUFC', '12345', '1994225024', 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `participate`
--

CREATE TABLE IF NOT EXISTS `participate` (
  `club` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `event_id` int(100) NOT NULL,
  PRIMARY KEY (`email`,`event_id`),
  KEY `club` (`club`,`email`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotion_request`
--

CREATE TABLE IF NOT EXISTS `promotion_request` (
  `Name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `club` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `promoted_designation` varchar(100) NOT NULL,
  PRIMARY KEY (`email`,`club`),
  KEY `club` (`club`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sponsor`
--

CREATE TABLE IF NOT EXISTS `sponsor` (
  `Email` varchar(40) NOT NULL,
  `Pin` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `Designation` varchar(40) NOT NULL,
  `funding` int(11) NOT NULL,
  `advisor_account` int(11) NOT NULL,
  `oca_id` int(11) NOT NULL,
  PRIMARY KEY (`Email`),
  KEY `oca_id` (`oca_id`),
  KEY `advisor_account` (`advisor_account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sponsor`
--

INSERT INTO `sponsor` (`Email`, `Pin`, `name`, `Designation`, `funding`, `advisor_account`, `oca_id`) VALUES
('hasanul@xybank.org', 12345, 'XY Bank', 'sponsor', 90000, 12345678, 1);

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

CREATE TABLE IF NOT EXISTS `volunteer` (
  `club` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `event_id` int(40) NOT NULL,
  `task` varchar(100) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  PRIMARY KEY (`club`,`email`,`event_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteer`
--

INSERT INTO `volunteer` (`club`, `email`, `event_id`, `task`, `money`) VALUES
('BUCC', 'keka@gmail.com', 3, NULL, NULL),
('BUCC', 'keka@gmail.com', 4, NULL, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `funding_request`
--
ALTER TABLE `funding_request`
  ADD CONSTRAINT `Test` FOREIGN KEY (`Sponsor_email`) REFERENCES `sponsor` (`Email`);

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `fk_member_club` FOREIGN KEY (`club`) REFERENCES `club` (`name`);

--
-- Constraints for table `participate`
--
ALTER TABLE `participate`
  ADD CONSTRAINT `part_event` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`),
  ADD CONSTRAINT `participate_ibfk_1` FOREIGN KEY (`club`,`email`) REFERENCES `member` (`club`, `email`);

--
-- Constraints for table `promotion_request`
--
ALTER TABLE `promotion_request`
  ADD CONSTRAINT `promotion_request_ibfk_1` FOREIGN KEY (`club`) REFERENCES `member` (`club`),
  ADD CONSTRAINT `promotion_request_ibfk_2` FOREIGN KEY (`email`) REFERENCES `member` (`email`);

--
-- Constraints for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD CONSTRAINT `vol_event` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`),
  ADD CONSTRAINT `volunteer_ibfk_1` FOREIGN KEY (`club`,`email`) REFERENCES `member` (`club`, `email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
