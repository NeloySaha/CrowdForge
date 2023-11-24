-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2023 at 08:00 AM
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
-- Database: `university_club_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `advisor`
--

CREATE TABLE `advisor` (
  `email` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `pin` int(11) NOT NULL,
  `Bank_account` int(11) NOT NULL,
  `designation` varchar(20) NOT NULL,
  `balance` int(11) NOT NULL,
  `club` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `advisor`
--

INSERT INTO `advisor` (`email`, `name`, `pin`, `Bank_account`, `designation`, `balance`, `club`) VALUES
('Kazi@gmail.com', 'Kazi Ahmed', 12345, 12345678, 'advisor', 0, 'BUCC'),
('mahim@bracu.com', 'Mahim Chowdhury', 12345, 42323, 'advisor', 7500, 'BULDF');

-- --------------------------------------------------------

--
-- Table structure for table `club`
--

CREATE TABLE `club` (
  `name` varchar(50) NOT NULL,
  `full_form` varchar(50) NOT NULL,
  `established_date` date NOT NULL,
  `location` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `announcement` varchar(4000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `club`
--

INSERT INTO `club` (`name`, `full_form`, `established_date`, `location`, `description`, `announcement`) VALUES
('BUCC', 'BRAC University Computer Club', '2014-10-21', 'ub81205', 'BRAC University Computer Club (BUCC) This club consists of a youthful team of passionate and hardworking Tech Enthusiast students. They strive to learn more about the advanced technologies of the 21st century. The club regularly offers workshops on web development, graphics designing, problem solving, and many other technological fields. To get the students engaging they organize contests on compe', 'Exciting news coming your way! 🚀 Get ready to embark on a journey of fun, laughter, and unforgettable moments. Drumroll, please... 🥁'),
('BUCuC', 'BRAC University Cultural Club', '2014-10-21', 'ub20412', 'Welcome to the vibrant heartbeat of artistic expression and cultural celebration at BRAC University—the BRACU Cultural Club. Our diverse and dynamic community thrives on a fusion of traditions, music, dance, and creativity. Embrace the richness of cultural exchange as we unite students with a passion for the arts. From traditional performances to modern interpretations, join us in fostering a tape', NULL),
('BUEDF', 'BRAC University Entrepreneurship Development Forum', '2013-01-01', 'ub50506', 'BRAC University Entrepreneurship Development Forum (EDF) was started in January 2004. EDF is the platform for Future Leaders of BRAC University. Entrepreneurship Development Forum (EDF) has been established to unearth the immense hidden potentiality and leadership of the students. The intention behind all the activities of this club is to help its members to sense the enormous latent force they possess. Moreover, complying with the modern day corporate ambiance, team work is emphasized here prior to everything so that the members can feel the bond in the long term when they will enter into the real corporate activities.', NULL),
('BUFC', 'BRAC University Film Club', '2014-10-21', 'ub50605', 'Lights, camera, action! Welcome to the BRAC University Film Club, where storytelling comes to life on the big screen. Dive into the magic of cinema with fellow enthusiasts who share a passion for the art of filmmaking. From scriptwriting to editing, our club is a creative haven for aspiring directors, actors, and cinematographers. Join us for screenings, discussions, and hands-on projects that nurture your cinematic flair. Whether you\'re an aficionado or a novice, we\'re here to celebrate the diverse world of film and cultivate the next generation of storytellers. Immerse yourself in the reel world at the BRACU Film Club—where every frame tells a story.', NULL),
('FCBU', 'Football Club Of BRAC University', '2014-10-21', 'ub21405', 'Get ready to lace up your boots and feel the adrenaline on the pitch with the BRAC University Football Club. Our club is more than just a team—it\'s a brotherhood of passionate players united by the love of the beautiful game. Whether you\'re a seasoned striker or a rookie goalie, we welcome all skill levels to join us in the pursuit of victory and camaraderie. Train hard, play harder, and be part of the spirited energy that fuels our football community. Embrace the thrill of the game, forge lasting friendships, and score unforgettable memories at the BRACU Football Club. Kick off your football journey with us!', NULL),
('MONON', 'BRAC University MONON', '2014-10-21', 'ub21403', 'BRAC UNIVERSITY MONON brings out diversified skills by contemplating non-conventional artistry.', NULL),
('ROBU', 'Robotics Club Of BRAC University', '2012-09-29', 'ub30303', 'Step into the future with the BRAC University Robotics Club—an innovation hub where curiosity meets cutting-edge technology. Our club is a dynamic platform for aspiring engineers, programmers, and tech enthusiasts to explore the exciting realm of robotics. Dive into hands-on projects, workshops, and competitions that challenge your intellect and fuel your passion for automation. Whether you\'re a seasoned expert or a curious beginner, our community thrives on collaboration and pushing the boundaries of what\'s possible. Join us in building a future where creativity and robotics converge to shape tomorrow\'s world. Unleash your potential with the BRACU Robotics Club!', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `name` varchar(100) NOT NULL,
  `head` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
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

CREATE TABLE `event` (
  `event_id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `cost` int(100) NOT NULL,
  `date` date NOT NULL,
  `capacity` int(100) NOT NULL,
  `venue` varchar(100) NOT NULL,
  `club_name` varchar(100) NOT NULL,
  `money_received` int(11) NOT NULL,
  `restriction` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `name`, `cost`, `date`, `capacity`, `venue`, `club_name`, `money_received`, `restriction`) VALUES
(1, 'Robo Carnival', 10000, '2023-12-15', 1000, 'UB6', 'ROBU', 2200, 0),
(3, 'Lets Dance', 5000, '2023-12-21', 200, 'UB3', 'BULDF', 4200, 1),
(4, 'BRAC CSE Job Fest', 20000, '2023-12-18', 1000, 'UB2', 'BUCC', 6400, 0),
(5, 'BUCC Freshers Enquee', 15000, '2023-12-10', 500, 'UB2', 'BUCC', 10100, 1),
(6, 'BUCC Winter vibes', 15000, '2023-12-31', 900, 'UB2', 'BUCC', 11500, 1);

-- --------------------------------------------------------

--
-- Table structure for table `funding_request`
--

CREATE TABLE `funding_request` (
  `Sponsor_email` varchar(40) NOT NULL,
  `Event` varchar(40) NOT NULL,
  `Amount` int(40) NOT NULL
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

CREATE TABLE `incoming_event` (
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

CREATE TABLE `incoming_request` (
  `name` varchar(110) NOT NULL,
  `designation` varchar(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `department` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `club` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `contact_no` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incoming_request`
--

INSERT INTO `incoming_request` (`name`, `designation`, `email`, `dob`, `department`, `gender`, `club`, `password`, `contact_no`) VALUES
('Biltu', 'Member', 'biltu@gmail.com', '2023-11-02', 'CSE', 'Male', 'BUCC', 'biltu123', '01231212312'),
('Ichigo', 'Member', 'ichigo@gmail.com', '2023-11-15', 'CSE', 'Male', 'BUCC', 'ichigo123', '01289028928');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
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
  `evaluation` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`name`, `designation`, `email`, `dob`, `department`, `gender`, `club`, `password`, `contact_no`, `rating`, `evaluation`) VALUES
('Abira', 'hr', 'abira@gmail.com', '2023-08-01', 'EEE', 'female', 'BUCC', '12345', '1994225023', 0, NULL),
('hr', 'hr', 'advisor@advisor.org', '1980-03-05', 'CSE', 'male', 'BUCC', '12345', '1112220004', 0, NULL),
('FlexedPanda', 'hr', 'flexed@gmail.com', '2000-04-19', 'CSE', 'male', 'ROBU', '12345', '1987634', 0, NULL),
('Neloy Saha', 'general', 'keka@gmail.com', '2023-11-03', 'MNS', 'Male', 'BUCC', 'neloy123', '01928932893', 0, NULL),
('Cersei', 'general', 'neloy12@gmail.com', '2023-11-13', 'PHY', 'Female', 'BUCC', 'neloy123', '01232930120', 0, NULL),
('Neloy Kumar Saha', 'general', 'neloy@gmail.com', '2023-11-03', 'CSE', 'Male', 'BUCC', 'neloy123', '1928821212', 0, NULL),
('Niaz', 'president', 'niaznafi@gmail.com', '1999-08-10', 'CSE', 'male', 'BUCC', '12345', '01733433100', 10, NULL),
('Vader', 'general', 'president@gmail.com', '2015-08-05', 'CSE', 'male', 'BUFC', '12345', '1994225024', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `participate`
--

CREATE TABLE `participate` (
  `club` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `event_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `participate`
--

INSERT INTO `participate` (`club`, `email`, `event_id`) VALUES
('BUCC', 'keka@gmail.com', 5),
('BUFC', 'president@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sponsor`
--

CREATE TABLE `sponsor` (
  `Email` varchar(40) NOT NULL,
  `Pin` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `Designation` varchar(40) NOT NULL,
  `funding` int(11) NOT NULL,
  `advisor_account` int(11) NOT NULL,
  `oca_id` int(11) NOT NULL
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

CREATE TABLE `volunteer` (
  `club` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `event_id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteer`
--

INSERT INTO `volunteer` (`club`, `email`, `event_id`) VALUES
('BUCC', 'keka@gmail.com', 5),
('BUCC', 'keka@gmail.com', 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advisor`
--
ALTER TABLE `advisor`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `club`
--
ALTER TABLE `club`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `funding_request`
--
ALTER TABLE `funding_request`
  ADD PRIMARY KEY (`Event`,`Sponsor_email`),
  ADD KEY `Test` (`Sponsor_email`);

--
-- Indexes for table `incoming_request`
--
ALTER TABLE `incoming_request`
  ADD PRIMARY KEY (`email`,`club`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`email`,`club`),
  ADD KEY `fk_member_club` (`club`);

--
-- Indexes for table `participate`
--
ALTER TABLE `participate`
  ADD PRIMARY KEY (`email`,`event_id`),
  ADD KEY `club` (`club`,`email`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `sponsor`
--
ALTER TABLE `sponsor`
  ADD PRIMARY KEY (`Email`),
  ADD KEY `oca_id` (`oca_id`),
  ADD KEY `advisor_account` (`advisor_account`);

--
-- Indexes for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD PRIMARY KEY (`club`,`email`,`event_id`),
  ADD KEY `event_id` (`event_id`);

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
  ADD CONSTRAINT `participate_ibfk_1` FOREIGN KEY (`club`,`email`) REFERENCES `member` (`club`, `email`),
  ADD CONSTRAINT `participate_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`);

--
-- Constraints for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD CONSTRAINT `volunteer_ibfk_1` FOREIGN KEY (`club`,`email`) REFERENCES `member` (`club`, `email`),
  ADD CONSTRAINT `volunteer_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
