const mysql = require('promise-mysql');
const db = require('./sqlConfig');

exports.handler = (event, context, callback) => {
  console.log(event);
  let connection;

  // INSERT INTO `suziespals`.`pet_profile` (`userId`, `petName`, `typeOfAnimal`, `breed`, `age`, `gender`) VALUES ('user1', 'Suzie', 'Dog', 'Labradore', '4 months', 'Female');

  mysql
    .createConnection(db)
    .then(conn => {
      console.log('connection established');
      connection = conn;
      return connection.query(
        `INSERT INTO pet (userId, name, animalType, breed, age, gender, bio) VALUES (
          '${evemt.userId}','${event.name}', '${event.animalType}', '${
          event.breed
        }','${event.age}',
          '${event.gender}', '${event.bio}'
        )`
      );
    })
    .then(result => {
      console.log(result);
      return connection.query(
        'select * from pet where petId = LAST_INSERT_ID()'
      );
    })
    .then(result => {
      connection.end();
      callback(null, result);
    })
    .catch(err => {
      console.log(err);
      connection.end();
      callback(err);
    });
};
