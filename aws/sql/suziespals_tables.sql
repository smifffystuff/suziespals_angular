DROP TABLE IF EXISTS `suziespals`.`pet_profile`;

CREATE TABLE `suziespals`.`pet_profile` (
  `profileId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `petName` VARCHAR(50) NOT NULL,
  `typeOfAnimal` VARCHAR(15),
  `breed` VARCHAR(30),
  `age` VARCHAR(15) NULL,
  `gender` VARCHAR(6) NULL,
  `bio` MEDIUMTEXT NULL,
  `profileImageId` VARCHAR(25) NULL,
  PRIMARY KEY (`profileId`));


