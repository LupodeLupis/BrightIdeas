-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: mymysql.senecacollege.ca
-- Generation Time: Nov 30, 2019 at 02:32 PM
-- Server version: 5.7.27-log
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prj666_193a05`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `applicationID` int(10) NOT NULL,
  `ideaLeaderId` int(10) DEFAULT NULL,
  `ideaID` int(10) DEFAULT NULL,
  `applicantId` int(10) DEFAULT NULL,
  `positionId` int(10) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`applicationID`, `ideaLeaderId`, `ideaID`, `applicantId`, `positionId`, `message`) VALUES
(1, 1, 1, 1, 1, 'i want to apply for this position'),
(2, 1, 1, 1, 1, 'i want to apply for this position'),
(3, 2, 2, 2, 2, 'is this position still available'),
(4, 3, 3, 3, 3, 'im really intrested in this position');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chatID` int(10) NOT NULL,
  `message` int(10) DEFAULT NULL,
  `chatMember` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`chatID`, `message`, `chatMember`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10),
(11, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `follower`
--

CREATE TABLE `follower` (
  `followerID` int(10) NOT NULL,
  `ideaID` int(10) NOT NULL,
  `userID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follower`
--

INSERT INTO `follower` (`followerID`, `ideaID`, `userID`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `idea`
--

CREATE TABLE `idea` (
  `ideaID` int(10) NOT NULL,
  `ideaName` varchar(30) NOT NULL,
  `ideaDescription` varchar(200) NOT NULL,
  `ideaCreator` int(10) DEFAULT NULL,
  `ideaLeader` int(10) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `toDoList` int(10) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `idea`
--

INSERT INTO `idea` (`ideaID`, `ideaName`, `ideaDescription`, `ideaCreator`, `ideaLeader`, `date`, `toDoList`, `category`) VALUES
(1, 'Vidnopoly', 'The Idea is based on creating a monopoly video game', 1, 1, '2019-05-04 04:00:00', 1, 'Technology'),
(2, 'EPlanner', 'The idea is to develop an app that can be used for planning a wedding', 2, 2, '2019-04-21 04:00:00', 2, 'Technology'),
(3, 'MathTeacher', 'The idea is to create a book of lesson for children', 3, 3, '2019-01-02 05:00:00', 3, 'Art'),
(4, 'BudgetTracker', 'An idea that allow people how to manage their finance using simple charts', 4, 4, '2019-01-02 05:00:00', 4, 'Data Science & Analytics'),
(5, 'HowToWrite', 'Creating a book guide that can be used as guideline to become a technical writer', 5, 5, '2019-07-02 04:00:00', 5, 'Art'),
(6, 'BrightIdeas', 'Creating a web application that has the goal to gathering people for sharing skills', 6, 6, '2019-04-25 04:00:00', 6, 'Technology'),
(7, 'TheSampsons', 'The idea is to create a cartoon for child under 10 years old', 7, 7, '2019-09-21 04:00:00', 7, 'Art'),
(8, 'LeagueOfHeros', 'The idea is to implement a video game', 8, 8, '2019-10-05 04:00:00', 8, 'Technology'),
(9, 'TravelSmart', 'A video that explain how to travel around the world in a smart way', 9, 9, '2019-05-02 04:00:00', 9, NULL),
(10, 'Wiki', 'The idea is to develop a portal information can be used for free', 10, 10, '2019-09-02 04:00:00', 10, NULL),
(144, 'First person shooter game', 'Im looking for help building a first person shooter game for PC. I want the game to be realistic so i need help from people that have a little experience.', 46, 46, '2019-11-28 19:12:07', 1, 'Technology'),
(145, 'Web application', 'I need help making a web application, that will let users share their favourite memes.', 46, 46, '2019-11-28 19:17:26', 1, 'Web development'),
(146, 'a', 'a', 25, 25, '2019-11-28 20:25:54', 1, 'Technology');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `mediaID` int(10) NOT NULL,
  `file` text,
  `mediaFormat` varchar(5) NOT NULL,
  `ideaID` int(10) DEFAULT NULL,
  `profileID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`mediaID`, `file`, `mediaFormat`, `ideaID`, `profileID`) VALUES
(1, 'idea/1.jpg', 'jpg', 1, NULL),
(2, 'idea/2.jpg', 'jpg', 2, NULL),
(3, 'profile/1.jpg', 'jpg', NULL, 1),
(4, 'profile/2.jpg', 'jpg', NULL, 2),
(5, 'idea/3.png', 'png', 3, NULL),
(6, 'idea/4.JPG', 'JPG', 3, NULL),
(7, 'profile/3.jpg', 'JPG', NULL, 3),
(8, 'profile/4.jpg', 'jpg', NULL, 4),
(9, 'idea/5.jpg', 'jpg', 4, NULL),
(10, 'idea/6.jpg', 'jpg', 4, NULL),
(11, 'profile/5.png', 'png', NULL, 5),
(12, 'profile/6.jpg', 'jpg', NULL, 6),
(13, 'idea/7.png', 'png', 5, NULL),
(14, 'idea/8.png', 'png', 1, NULL),
(15, 'profile/7.jpg', 'jpg', NULL, 7),
(16, 'profile/8.png', 'png', NULL, 8),
(17, 'idea/9.jpg', 'jpg', 6, NULL),
(18, 'idea/10.jpg', 'jpg', 1, NULL),
(19, 'profile/9.jpg', 'jpg', NULL, 9),
(20, 'profile/10.jpg', 'jpg', NULL, 10);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `memberID` int(10) NOT NULL,
  `userID` int(10) NOT NULL,
  `roleID` int(10) NOT NULL,
  `ideaID` int(10) NOT NULL,
  `memberlevel` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`memberID`, `userID`, `roleID`, `ideaID`, `memberlevel`) VALUES
(1, 1, 2, 1, 0),
(2, 2, 5, 1, 0),
(3, 3, 3, 3, 0),
(4, 4, 7, 4, 0),
(5, 5, 8, 5, 0),
(6, 6, 10, 6, 0),
(7, 7, 9, 1, 0),
(8, 8, 6, 1, 0),
(9, 9, 4, 1, 0),
(10, 10, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `messageID` int(10) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` varchar(200) NOT NULL,
  `sender` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`messageID`, `timeStamp`, `text`, `sender`) VALUES
(1, '2019-09-01 04:00:00', 'Can we talk tomorrow?', 1),
(2, '2019-07-01 04:00:00', 'I will available on Monday from 10 am to 11 am', 2),
(3, '2019-08-15 04:00:00', 'I have updated the file as requested', 3),
(4, '2019-06-18 04:00:00', 'Hi Karla, are you able to look at the last updated file?', 4),
(5, '2019-04-21 04:00:00', 'I will be working on the idea only 10 hours a week', 5),
(6, '2019-02-03 05:00:00', 'Hey guys, can we postpone the video to Tuesday?', 6),
(7, '2019-05-07 04:00:00', 'Hi Manila, I like your idea, can I join the group?', 7),
(8, '2019-08-01 04:00:00', 'Hi there, I will be off line until 2pm', 8),
(9, '2019-04-25 04:00:00', 'We almost finish the project! Congratulations!', 9),
(10, '2019-01-11 05:00:00', 'This is a brilliant idea!I would like to join the group', 10);

-- --------------------------------------------------------

--
-- Table structure for table `posting`
--

CREATE TABLE `posting` (
  `postingID` int(10) NOT NULL,
  `postingName` varchar(30) NOT NULL,
  `postingDescription` varchar(200) DEFAULT NULL,
  `numberAvailable` tinyint(2) NOT NULL DEFAULT '1',
  `numberFilled` tinyint(2) DEFAULT NULL,
  `ideaID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posting`
--

INSERT INTO `posting` (`postingID`, `postingName`, `postingDescription`, `numberAvailable`, `numberFilled`, `ideaID`) VALUES
(1, 'Web devsdfsdfssfseloper', 'Looking for an sdfsdfsfenthusiastic React developer', 54, 33, 1),
(2, 'UX Designer', 'Looking for a UX Designer that has experience with UXPin', 1, 0, 1),
(3, 'Illustrator', 'Looking for an illustrator that has experience with CAD ', 1, 1, 1),
(4, 'Animator', 'Seeking an animator who has experience with Adobe Animate', 4, 3, 2),
(5, 'Male voice Actor', 'Need several voice actors to voice male characters', 15, 2, 3),
(6, 'Female voice Actor', 'Need several voice actresses to voice female characters and children', 15, 8, 4),
(7, 'C++ Developer', 'Need C++ developer to create a video game for children under 10 years old', 3, 2, 5),
(8, 'Teacher', 'Looking for a teacher that has experience how to plan activity for students', 1, 0, 5),
(9, 'Accountant', 'Looking for an accountant that has experience with Sage Accounting ', 4, 1, 6),
(10, 'Translator', 'Need a team member translator that has excellent proofreading skill', 3, 0, 7),
(18, 'Teacher', 'Looking for a teacher that has experience how to plan activity for students', 1, 0, 8),
(395, 'Web developer testing', 'Looking for an enthusiastic React developer', 5, 3, NULL),
(396, 'Web developer testing', 'Looking for an enthusiastic React developer', 5, 3, 10),
(777, 'a', 'a', 1, 0, 137),
(779, 'a', 'a', 1, 0, NULL),
(780, 'a', 'a', 1, 0, 139),
(781, 'aa', 'aa', 1, 0, NULL),
(782, 'aaa', 'aaa', 1, 0, NULL),
(783, 'q', 'q', 1, 0, NULL),
(784, 'aa', 'aaa', 1, 0, 140),
(785, 'aaa', 'a', 1, 0, 141),
(786, 'a', 'a', 1, 0, 142),
(787, 'q', 'q', 1, 0, NULL),
(788, 'aa', '11', 1, 0, 143),
(789, 'Graphic designer', 'Im looking for a dedicated graphic designer thats interested in video games', 2, 0, NULL),
(790, 'Game engine design', 'I need one person that has more experience than i do in game engine design to help me build my game.', 1, 0, NULL),
(791, 'Game tester', 'This is self explanatory, but i need a game tester.', 1, 0, NULL),
(792, 'aa', 'aa', 1, 0, NULL),
(793, 'a', 'a', 1, 0, NULL),
(795, 'Graphic designer', 'im looking for someone to design 3D models for my game.', 2, 0, 144),
(796, 'Game engine design', 'I need someone that has a little more experience than me to help me with the game engine design.', 1, 0, 144),
(797, 'Game tester', 'I need a person to test the game extensively and find possible bugs.', 1, 0, 144),
(798, 'Backend developer', 'I need a developer to design the backend for my application', 2, 0, 145),
(799, 'Front end designer', 'I want a experienced front end developer to handle all the front end of the application.', 1, 0, 145),
(800, 'a', 'a', 1, 0, NULL),
(801, 'a', 'a', 1, 0, 146);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profileID` int(10) NOT NULL,
  `profilePicture` text NOT NULL,
  `profileDisplayName` varchar(25) NOT NULL,
  `profileDescription` varchar(500) NOT NULL,
  `userID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profileID`, `profilePicture`, `profileDisplayName`, `profileDescription`, `userID`) VALUES
(1, 'img_profile.png', 'Martin Kelvin', 'Student and passionate in videogames', 1),
(2, 'img_profile.jpeg', 'Henry Rollins', 'Software Engineer and Entrepreneur', 2),
(3, 'img_profile.jpeg', 'Victor Lee', 'Fresh graduated looking for a challenge', 3),
(4, 'img_profile.jpeg', 'Manila Handerson', 'Actress with the hobby for the sport', 4),
(5, 'img_profile.jpeg', 'Felipe Turin', 'Retired professor who is looking for new challenges', 5),
(6, 'img_profile.jpeg', 'Enrique Valez', 'Web developer with the interest in medicine', 6),
(7, 'img_profile.jpeg', 'Maria Lopez', 'Accountant and broker with the passion of design and architecture', 7),
(8, 'img_profile.jpeg', 'Karla Veric', 'Technical writer with the interest in C++', 8),
(9, 'img_profile.jpeg', 'Mary Smith', 'Lawyer with the passion of aviation', 9),
(10, 'img_profile.jpeg', 'Leslie Paris', 'Journalist with passion of web development', 10),
(11, 'profilePicture.png', 'jayson sherry', 'student at seneca college', 3),
(35, '22profilePicture.png', '22jayson sherry', '22student at seneca college', 1),
(67, '', 'jaysonsherry', 'this is about me', 46);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `reportID` int(10) NOT NULL,
  `message` varchar(200) NOT NULL,
  `flaggedUser` int(10) DEFAULT NULL,
  `flaggedIdea` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleID` int(10) NOT NULL,
  `roleName` varchar(30) NOT NULL,
  `roleDescription` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleID`, `roleName`, `roleDescription`) VALUES
(1, 'Web Developer', 'The Web developer will be taking care of writing code following precise requirements'),
(2, 'UX Designer', 'The UX Designer will be working on the design of the Idea project'),
(3, 'Illustrator', 'The Illustrator will be taking care in creating original document for digital publications'),
(4, 'Animator', 'The animator will be acting as key role in the Idea project'),
(5, 'C++ Programmer', 'The C++ programmer will be focus on implementing and testing code for the application'),
(6, 'Teacher', 'The teacher role will be to supervise the and give opinion ho to model the book'),
(7, 'Accountant', 'This role will be taking care in creating example in excel'),
(8, 'Translator', 'The translator will be in charge to translate document from English to French'),
(9, 'Graphic Designer', 'The graphic designer will take care in creating logos and illustrations'),
(10, 'Data Analyst', 'The Data Analyst will develop analysis'),
(11, 'Web Developer', 'The Web developer will be taking care of writing code following precise requirements'),
(12, 'UX Designer', 'The UX Designer will be working on the design of the Idea project'),
(13, 'Illustrator', 'The Illustrator will be taking care in creating original document for digital publications'),
(14, 'Animator', 'The animator will be acting as key role in the Idea project'),
(15, 'C++ Programmer', 'The C++ programmer will be focus on implementing and testing code for the application'),
(16, 'Teacher', 'The teacher role will be to supervise the and give opinion ho to model the book'),
(17, 'Accountant', 'This role will be taking care in creating example in excel'),
(18, 'Translator', 'The translator will be in charge to translate document from English to French'),
(19, 'Graphic Designer', 'The graphic designer will take care in creating logos and illustrations'),
(20, 'Data Analyst', 'The Data Analyst will develop analysis');

-- --------------------------------------------------------

--
-- Table structure for table `todo`
--

CREATE TABLE `todo` (
  `toDoID` int(10) NOT NULL,
  `toDoDescription` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `todo`
--

INSERT INTO `todo` (`toDoID`, `toDoDescription`) VALUES
(1, 'Discuss how planning activities for the idea'),
(2, 'Give an overview of the idea with more detail'),
(3, 'Discuss how many hours the members can contribute'),
(4, 'Open a new channel for chatting with contributors'),
(5, 'Create a posting for web designer'),
(6, 'List all the activities that can be shared with contributors'),
(7, 'Monitor idea'),
(8, 'Select the best contributor'),
(9, 'Clarify the scope of the idea'),
(10, 'Support contributors for specific requests'),
(11, 'Discuss how planning activities for the idea'),
(12, 'Give an overview of the idea with more detail'),
(13, 'Discuss how many hours the members can contribute'),
(14, 'Open a new channel for chatting with contributors'),
(15, 'Create a posting for web designer'),
(16, 'List all the activities that can be shared with contributors'),
(17, 'Monitor idea'),
(18, 'Select the best contributor'),
(19, 'Clarify the scope of the idea'),
(20, 'Support contributors for specific requests');

-- --------------------------------------------------------

--
-- Table structure for table `update`
--

CREATE TABLE `update` (
  `updateID` int(10) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(200) NOT NULL,
  `ideaID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `update`
--

INSERT INTO `update` (`updateID`, `date`, `description`, `ideaID`) VALUES
(1, '2019-10-23 16:10:34', 'A new feature has been added to the project', 1),
(2, '2019-10-22 16:10:34', 'The picture (item) related to the User Page has been deleted', 1),
(3, '2019-10-22 16:10:34', 'A new update will be released soon', 2),
(4, '2019-10-22 16:10:34', 'The idea will be updated with a new scope in the next few days', 2),
(5, '2019-10-22 16:10:34', 'A new position for the Charity idea will be posted tomorrow', 3),
(6, '2019-10-22 16:10:34', 'A new activity has been discussed for the Idea Last Minute', 4),
(7, '2019-10-22 16:10:34', 'The feature related to the point one will not be longer considered', 5),
(8, '2019-10-22 16:10:34', 'A requirement to develop the idea is to have Visual Code installed', 1),
(9, '2019-10-22 16:10:34', 'For the post new detail will needed', 6),
(10, '2019-10-22 16:10:34', 'The Idea will be considered to have more features', 7);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(10) NOT NULL,
  `emailAddress` varchar(40) NOT NULL,
  `profile` int(10) DEFAULT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(60) NOT NULL,
  `previousPasswords` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `emailAddress`, `profile`, `isVerified`, `password`, `previousPasswords`) VALUES
(1, 'kelvin1984@gmail.com', 1, 0, '8e5dac988aa0766729136089f2e6c704', 'f1099950db132e5bcb1d3dbc5000df62'),
(2, 'henry2019@hotmail.ca', 2, 1, '2db8a754d8c0ab2de5462cfc0929e88d', 'ee258baa6606ae7c7fb095c30ded3a11'),
(3, 'victor_lee@gmail.com', 3, 0, '53a71e6fde0447cc215ccdb0e6d87ed9', 'd003321430d11e39190c0802a434cd6f'),
(4, 'manila@virgilio.it', 4, 1, '14e273e6f416c4b90a071f59ac01206a', '591785b794601e212b260e25925636fd'),
(5, 'felipeTourin2019@gmail.com', 5, 1, 'aa6303f75e6c0cb55cd7196005ad4856', '4729307a2f895c1e5ce606694ba652ae'),
(6, 'valeze@facebook.ca', 6, 1, '4beb16b0537f7901008ba52f3a97cda3', '3edd182cbd5d98b1ef774bc992a03e3b'),
(7, 'vericKarla@canada.ca', 7, 1, '14ac65154661c5f37c4c41fda62ba6ac', '7afad4c30d0de824ba1f6284adfffe72'),
(8, 'smith2019@gmail.ca', 8, 1, 'a02ec069f95825d101e83110055e24a8', '9bd43a86568c4a898fcf3d14a68513d1'),
(9, 'paris_leslie@medium.com', 9, 1, 'b6e7f4684fae52db1c9e33687b697d38', '0585c79ce019808f1fbbd19e7e8f75e6'),
(10, 'lopez_maria@gmail.ca', 10, 0, 'ec1027cc3775da65bbc7c99c0b084e90', 'c5197605c2b1b35795c120221aee0f7f'),
(25, 'test@gmail.com', NULL, 0, '$2a$10$B4B0DM.87f3cW1Sq61trsuScsuQzqQjbo/JYYHkcYAItHeYCi6Zhe', '$2a$10$B4B0DM.87f3cW1Sq61trsuScsuQzqQjbo/JYYHkcYAItHeYCi6Zhe'),
(42, 'emile.ohan@senecacollege.ca', NULL, 0, '$2a$10$xwWez96B0XPvT/Hz2DJjV.UgY.4bTYRqkgZJuwlrMlhPTJAeoBeGO', '$2a$10$xwWez96B0XPvT/Hz2DJjV.UgY.4bTYRqkgZJuwlrMlhPTJAeoBeGO'),
(43, 'jh@hotmail.com', NULL, 0, '$2a$10$eXJLwH0yFPJNmh.OzTKECeiNz/3ljXzTOaZfultNHlHY9doQCCWJe', '$2a$10$eXJLwH0yFPJNmh.OzTKECeiNz/3ljXzTOaZfultNHlHY9doQCCWJe'),
(46, 'jaysonsherry@hotmail.com', NULL, 1, '$2a$10$KD1taCfPc2TNmo5O1l.gAetpGRDmoO14FDAIr62JeQVMO/c2uU47a', '$2a$10$KD1taCfPc2TNmo5O1l.gAetpGRDmoO14FDAIr62JeQVMO/c2uU47a'),
(47, 'jhui@e.ca', NULL, 1, '$2a$10$8hiOFY/5AS9JQ4jIRQmFXOCD1vkajL9zRUm8VXE8TY8fRqMgMCHm.', '$2a$10$8hiOFY/5AS9JQ4jIRQmFXOCD1vkajL9zRUm8VXE8TY8fRqMgMCHm.'),
(48, 'jhui@hot.com', NULL, 1, '$2a$10$5y4GxiOYbPEknYootkjZjuwaFm1a4RlhfKhMKS0y21mIUIFLkcKym', '$2a$10$5y4GxiOYbPEknYootkjZjuwaFm1a4RlhfKhMKS0y21mIUIFLkcKym'),
(49, 'jordanhui19@hotmail.com', NULL, 1, '$2a$10$VTMhLBwslD/xXDcRkcbBEenqnuJdoUBGZmlFbU2gsJd88NhIsiDq.', '$2a$10$VTMhLBwslD/xXDcRkcbBEenqnuJdoUBGZmlFbU2gsJd88NhIsiDq.'),
(50, 'nian.jack@gmail.com', NULL, 1, '$2a$10$8NlyRyOz3tHMF3A0JNm4Ou4WEEKNCuJxo3MXbDMvBGHUkceC2UUJi', '$2a$10$8NlyRyOz3tHMF3A0JNm4Ou4WEEKNCuJxo3MXbDMvBGHUkceC2UUJi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`applicationID`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chatID`),
  ADD KEY `fk_message_id` (`message`),
  ADD KEY `fk_chat_member_id` (`chatMember`);

--
-- Indexes for table `follower`
--
ALTER TABLE `follower`
  ADD PRIMARY KEY (`followerID`),
  ADD KEY `fk_user_follower_id` (`userID`);

--
-- Indexes for table `idea`
--
ALTER TABLE `idea`
  ADD PRIMARY KEY (`ideaID`),
  ADD KEY `fk_creator_id` (`ideaCreator`),
  ADD KEY `fk_leader_id` (`ideaLeader`),
  ADD KEY `fk_to_do_id` (`toDoList`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`mediaID`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`memberID`),
  ADD KEY `fk_role_id` (`roleID`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`messageID`),
  ADD KEY `fk_sender_id` (`sender`);

--
-- Indexes for table `posting`
--
ALTER TABLE `posting`
  ADD PRIMARY KEY (`postingID`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profileID`),
  ADD KEY `fk_user_id` (`userID`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`reportID`),
  ADD KEY `fk_flagged_user_id` (`flaggedUser`),
  ADD KEY `fk_flagged_idea_id` (`flaggedIdea`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleID`);

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`toDoID`);

--
-- Indexes for table `update`
--
ALTER TABLE `update`
  ADD PRIMARY KEY (`updateID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `applicationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `chatID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `follower`
--
ALTER TABLE `follower`
  MODIFY `followerID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `idea`
--
ALTER TABLE `idea`
  MODIFY `ideaID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `mediaID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `memberID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `messageID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `posting`
--
ALTER TABLE `posting`
  MODIFY `postingID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=803;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profileID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `reportID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `roleID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `toDoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `update`
--
ALTER TABLE `update`
  MODIFY `updateID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_chat_member_id` FOREIGN KEY (`chatMember`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `fk_message_id` FOREIGN KEY (`message`) REFERENCES `message` (`messageID`);

--
-- Constraints for table `follower`
--
ALTER TABLE `follower`
  ADD CONSTRAINT `fk_user_follower_id` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `idea`
--
ALTER TABLE `idea`
  ADD CONSTRAINT `fk_creator_id` FOREIGN KEY (`ideaCreator`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `fk_leader_id` FOREIGN KEY (`ideaLeader`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `fk_to_do_id` FOREIGN KEY (`toDoList`) REFERENCES `todo` (`toDoID`);

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `fk_role_id` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_sender_id` FOREIGN KEY (`sender`) REFERENCES `user` (`userID`);

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `fk_flagged_idea_id` FOREIGN KEY (`flaggedIdea`) REFERENCES `idea` (`ideaID`),
  ADD CONSTRAINT `fk_flagged_user_id` FOREIGN KEY (`flaggedUser`) REFERENCES `user` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
