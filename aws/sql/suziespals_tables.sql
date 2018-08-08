-- last build 8/8/2018 @ 10:05

USE `suziespals`;


DROP TABLE IF EXISTS `pet_profile`;

CREATE TABLE `pet_profile` (
  `profileId` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(100) NOT NULL,
  `petName` VARCHAR(50) NOT NULL,
  `typeOfAnimal` VARCHAR(15),
  `breed` VARCHAR(30),
  `age` VARCHAR(15) NULL,
  `gender` VARCHAR(6) NULL,
  `bio` MEDIUMTEXT NULL,
  `profileImageId` VARCHAR(25) NULL,
  PRIMARY KEY (`profileId`));

