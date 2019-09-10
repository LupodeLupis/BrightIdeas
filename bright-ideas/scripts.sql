CREATE TABLE IF NOT EXISTS `media` (
    `mediaID` int(10) NOT NULL AUTO_INCREMENT,
    `fileName` varchar(30) NOT NULL,
    `mediaFormat` varchar(5) NOT NULL,
    `mediaURI` varchar(100) NOT NULL,
    PRIMARY KEY (`mediaID`) 
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS  `profile` (
    `profileID` int(10) NOT NULL AUTO_INCREMENT,
    `profilePicture` varchar(30) NOT NULL,
    `profileDisplayName` varchar(25) NOT NULL,
    `profileDescription` varchar(500) NOT NULL,
    `profileProjectDescription` varchar(200),
    PRIMARY KEY (`profileID`) 
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `credentials` (
    `credentialID` int(10) NOT NULL AUTO_INCREMENT,
    `userName` varchar(25) NOT NULL,
    `password` varchar(60) NOT NULL,
    `previousPasswords` varchar(60) NOT NULL,
    PRIMARY KEY (`credentialID`) 
) AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `todo`(
    `toDoID` int(10) NOT NULL AUTO_INCREMENT,
    `toDoDescription` varchar(200) NOT NULL,
    PRIMARY KEY (`toDoID`) 
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `update`(
    `updateID` int(10) NOT NULL AUTO_INCREMENT,
    `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `description` varchar(200) NOT NULL,
    PRIMARY KEY(`updateID`)
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `posting`(
    `postingID` int(10) NOT NULL AUTO_INCREMENT,
    `postingName` varchar(30) NOT NULL,
    `postingDescription` varchar(200) DEFAULT NULL,
    `numberAvailable` tinyint(2) NOT NULL DEFAULT 1,
    `numberFilled` tinyint(2) DEFAULT NULL,
    PRIMARY KEY (`postingID`) 
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `role`(
    `roleID` int(10) NOT NULL AUTO_INCREMENT,
    `roleName` varchar(30) NOT NULL,
    `roleDescription` varchar(200) DEFAULT NULL,
    PRIMARY KEY (`roleID`) 
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `user`(
    `userID` int(10) NOT NULL AUTO_INCREMENT,
    `emailAddress` varchar(40) NOT NULL,
    `profile` int(10),
    `isVerified` tinyint(1) NOT NULL DEFAULT 0,
    `credentials` int(10) NOT NULL,
    PRIMARY KEY (`userID`),
    CONSTRAINT `fk_profile_id` FOREIGN KEY (`profile`) REFERENCES `profile` (`profileID`) ,
    CONSTRAINT `fk_credentials_id` FOREIGN KEY (`credentials`) REFERENCES `credentials` (`credentialID`) 
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `message`(
    `messageID` int(10) NOT NULL AUTO_INCREMENT,
    `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `text` varchar(200) NOT NULL,
    `sender` int(10) NOT NULL,
    PRIMARY KEY (`messageID`),
    CONSTRAINT `fk_sender_id` FOREIGN KEY (`sender`) REFERENCES `user` (`userID`) 
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `member`(
    `memberID` int(10) NOT NULL AUTO_INCREMENT,
    `userID` int(10) NOT NULL,
    `roleID` int(10) NOT NULL,
    `ideaID` int(10) NOT NULL,
    `memberlevel` tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`memberID`),
    CONSTRAINT `fk_role_id` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`) 
) AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `chat`(
    `chatID` int(10) NOT NULL AUTO_INCREMENT,
    `message` int(10),
    `chatMember` int(10),
    PRIMARY KEY (`chatID`),
    CONSTRAINT `fk_message_id` FOREIGN KEY (`message`) REFERENCES `message` (`messageID`),
    CONSTRAINT `fk_chat_member_id` FOREIGN KEY (`chatMember`) REFERENCES `user` (`userID`)
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `idea`(
    `ideaID` int(10) NOT NULL AUTO_INCREMENT,
    `ideaDescription` varchar(200) NOT NULL,
    `ideaCreator` int(10) NOT NULL,
    `ideaLeader` int(10),
    `media` int(10) DEFAULT NULL,
    `posting` int(10) NOT NULL,
    `update` int(10) DEFAULT NULL,
    `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `toDoList` int(10) DEFAULT NULL,
    `ideaMembers` int(10) NOT NULL,
    PRIMARY KEY (`ideaID`),
    CONSTRAINT `fk_creator_id` FOREIGN KEY (`ideaCreator`) REFERENCES `user` (`userID`) ,
    CONSTRAINT `fk_leader_id` FOREIGN KEY (`ideaLeader`) REFERENCES `user` (`userID`) ,
    CONSTRAINT `fk_media_id` FOREIGN KEY (`media`) REFERENCES `media` (`mediaID`) ,
    CONSTRAINT `fk_posting_id` FOREIGN KEY (`posting`) REFERENCES `posting` (`postingID`) ,
    CONSTRAINT `fk_update_id` FOREIGN KEY (`update`) REFERENCES `update` (`updateID`) ,
    CONSTRAINT `fk_to_do_id` FOREIGN KEY (`toDoList`) REFERENCES `todo` (`toDoID`) ,
    CONSTRAINT `fk_members_id` FOREIGN KEY (`ideaMembers`) REFERENCES `member` (`memberID`) 
) AUTO_INCREMENT=1; 


CREATE TABLE IF NOT EXISTS `follower`(
  	`followerID` int(10) NOT NULL AUTO_INCREMENT,
    `ideaID` int(10) NOT NULL,
    `userID` int(10) NOT NULL,
    PRIMARY KEY (`followerID`),
    CONSTRAINT `fk_user_id` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) 
)AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `report`(
    `reportID` int(10) NOT NULL AUTO_INCREMENT,
    `message` varchar(200) NOT NULL,
    `flaggedUser` int(10),
    `flaggedIdea` int(10),
    PRIMARY KEY (`reportID`),
    CONSTRAINT `fk_flagged_user_id` FOREIGN KEY (`flaggedUser`) REFERENCES `user` (`userID`) ,
    CONSTRAINT `fk_flagged_idea_id` FOREIGN KEY (`flaggedIdea`) REFERENCES `idea` (`ideaID`)
) AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `report`;
DROP TABLE IF EXISTS `follower`;
DROP TABLE IF EXISTS `idea`;
DROP TABLE IF EXISTS `chat`;
DROP TABLE IF EXISTS `member`;
DROP TABLE IF EXISTS `message`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `posting`;
DROP TABLE IF EXISTS `update`;
DROP TABLE IF EXISTS `todo`;
DROP TABLE IF EXISTS `credentials`;
DROP TABLE IF EXISTS `media`;
DROP TABLE IF EXISTS `profile`;
