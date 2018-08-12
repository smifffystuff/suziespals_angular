-- last build 8/8/2018 @ 10:05

USE `suziespals`;


DROP TABLE IF EXISTS `pet`;
CREATE TABLE `pet` (
  `petId` VARCHAR(50) NOT NULL,
  `userId` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `animalType` VARCHAR(15),
  `breed` VARCHAR(30),
  `gender` VARCHAR(6) NULL,
  `age` VARCHAR(15) NULL,
  `bio` MEDIUMTEXT NULL,
  `profileImageId` VARCHAR(50) NULL,
  PRIMARY KEY (`petId`));


DROP TABLE IF EXISTS `pet_friends`;
CREATE TABLE `pet_friends` (
  `friendId` INT NOT NULL AUTO_INCREMENT,
  `petId` VARCHAR(50) NOT NULL,
  `friendPetId` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`friendId`));


DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `postId` VARCHAR(50) NOT NULL,
  `petId` VARCHAR(50) NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `message` MEDIUMTEXT NULL,
  `postedOn` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`postId`));

DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `imageId` VARCHAR(50) NOT NULL,
  `petId` VARCHAR(50) NOT NULL,
  `comment` MEDIUMTEXT NULL,
  `addedOn` DATETIME NOT NULL,
  PRIMARY KEY (`imageId`));

DROP TABLE IF EXISTS `post_images`;
CREATE TABLE `post_images` (
  `postImageId` INT NOT NULL AUTO_INCREMENT,
  `postId` VARCHAR(50) NOT NULL,
  `imageId` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`postImageId`));



