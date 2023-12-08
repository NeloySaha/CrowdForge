-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2023 at 08:36 PM
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
-- Table structure for table `club`
--

CREATE TABLE `club` (
  `name` varchar(50) NOT NULL,
  `full_form` varchar(50) NOT NULL,
  `established_date` date NOT NULL,
  `location` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `announcement_detail` varchar(4000) DEFAULT NULL,
  `announcement_title` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `club`
--

INSERT INTO `club` (`name`, `full_form`, `established_date`, `location`, `description`, `announcement_detail`, `announcement_title`) VALUES
('BUCC', 'BRAC University Computer Club', '2014-10-21', 'ub81205', 'BRAC University Computer Club (BUCC) This club consists of a youthful team of passionate and hardworking Tech Enthusiast students. They strive to learn more about the advanced technologies of the 21st century. The club regularly offers workshops on web development, graphics designing, problem solving, and many other technological fields. To get the students engaging they organize contests on compe', 'How are you all doing today🎉', 'Hey BUCC family🎉🚀'),
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
(2, 'Lets Dance', 5000, '2023-12-21', 200, 'UB3', 'BULDF', 4200, 1),
(3, 'BRAC CSE Job Fest', 20000, '2023-12-18', 1000, 'UB2', 'BUCC', 12400, 0),
(4, 'BUCC Freshers Enquee', 15000, '2023-12-10', 500, 'UB2', 'BUCC', 11700, 1),
(5, 'BUCC Winter vibes', 15000, '2023-12-31', 900, 'UB2', 'BUCC', 12000, 1),
(6, 'BUCC Dhumaachale', 10000, '2023-11-16', 200, 'UB9', 'BUCC', 2000, 0),
(7, 'BUCC Fair', 10000, '2023-11-17', 200, 'UB9', 'BUCC', 10000, 0),
(10, 'BUCC Dance Bangla Dance', 20000, '2023-12-27', 400, 'UB2', 'BUCC', 0, 1),
(11, 'Union of the Realms', 25000, '2024-01-01', 50, 'Asgard\'s Odin Chamber', 'BUCC', 4197, 1);

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
  `venue` varchar(100) NOT NULL,
  `club_name` varchar(100) NOT NULL,
  `restriction` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incoming_event`
--

INSERT INTO `incoming_event` (`event_id`, `name`, `cost`, `date`, `capacity`, `venue`, `club_name`, `restriction`) VALUES
(5, 'Avengers', 10000, '2023-12-29', 100, 'New Campus', 'BUCC', 1);

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
  `contact_no` varchar(100) NOT NULL,
  `incoming_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `evaluation` varchar(1000) DEFAULT NULL,
  `bank_account` int(11) DEFAULT NULL,
  `money` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`name`, `designation`, `email`, `dob`, `department`, `gender`, `club`, `password`, `contact_no`, `rating`, `evaluation`, `bank_account`, `money`) VALUES
('Abira Rahman', 'hr', 'abira@gmail.com', '2004-03-05', 'PHY', 'Female', 'BUCC', '12345', '01589201010', 0, NULL, NULL, NULL),
('Aboni Rounak', 'advisor', 'aboni@gmail.com', '2001-05-25', 'CSE', 'Female', 'BUCC', '12345', '01929101010', 3, NULL, 987654321, 70503),
('FlexedPanda', 'advisor', 'flexed@gmail.com', '2000-04-19', 'CSE', 'male', 'ROBU', '12345', '1987634', 0, NULL, 1234567890, 100000),
('Cersei Lannister', 'general', 'keka@gmail.com', '2023-12-02', 'CSE', 'Female', 'BUCC', '12345', '01910101010', 6, NULL, NULL, NULL),
('Neloy Saha🐊', 'treasurer', 'neloy@gmail.com', '2023-12-01', 'CSE', 'Male', 'BUCC', '12345', '01920101010', 5, NULL, 1234567890, 40597),
('Nihal Rahman', 'president', 'niaznafi@gmail.com', '2023-12-01', 'CSE', 'Male', 'BUCC', '12345', '01289101010', 10, NULL, NULL, NULL),
('Vader', 'general', 'president@gmail.com', '2015-08-05', 'CSE', 'male', 'BUFC', '12345', '1994225024', 0, NULL, NULL, NULL);

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
('BUCC', 'keka@gmail.com', 1),
('BUCC', 'keka@gmail.com', 4);

-- --------------------------------------------------------

--
-- Table structure for table `promotion_request`
--

CREATE TABLE `promotion_request` (
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `club` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `promoted_designation` varchar(100) NOT NULL,
  `prom_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

CREATE TABLE `volunteer` (
  `club` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `event_id` int(40) NOT NULL,
  `task` varchar(100) DEFAULT NULL,
  `money` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteer`
--

INSERT INTO `volunteer` (`club`, `email`, `event_id`, `task`, `money`) VALUES
('BUCC', 'keka@gmail.com', 5, 'Collect Balloons', 0),
('BUCC', 'keka@gmail.com', 6, 'Arrange some food stalls in the campus', 100),
('BUCC', 'keka@gmail.com', 7, 'Try to find some open minded sponsors', 0);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `incoming_event`
--
ALTER TABLE `incoming_event`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `incoming_event_ibfk_1` (`club_name`);

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
  ADD KEY `fk_member_club` (`club`),
  ADD KEY `department` (`department`);

--
-- Indexes for table `participate`
--
ALTER TABLE `participate`
  ADD PRIMARY KEY (`email`,`event_id`),
  ADD KEY `club` (`club`,`email`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `promotion_request`
--
ALTER TABLE `promotion_request`
  ADD PRIMARY KEY (`email`,`club`),
  ADD KEY `promotion_request_ibfk_2` (`club`);

--
-- Indexes for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD PRIMARY KEY (`club`,`email`,`event_id`),
  ADD KEY `event_id` (`event_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `incoming_event`
--
ALTER TABLE `incoming_event`
  MODIFY `event_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `incoming_event`
--
ALTER TABLE `incoming_event`
  ADD CONSTRAINT `incoming_event_ibfk_1` FOREIGN KEY (`club_name`) REFERENCES `club` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `fk_member_club` FOREIGN KEY (`club`) REFERENCES `club` (`name`),
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`department`) REFERENCES `department` (`name`);

--
-- Constraints for table `participate`
--
ALTER TABLE `participate`
  ADD CONSTRAINT `part_event` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participate_ibfk_1` FOREIGN KEY (`club`,`email`) REFERENCES `member` (`club`, `email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `promotion_request`
--
ALTER TABLE `promotion_request`
  ADD CONSTRAINT `promotion_request_ibfk_1` FOREIGN KEY (`email`) REFERENCES `member` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `promotion_request_ibfk_2` FOREIGN KEY (`club`) REFERENCES `member` (`club`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD CONSTRAINT `vol_event` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `volunteer_ibfk_1` FOREIGN KEY (`club`,`email`) REFERENCES `member` (`club`, `email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
