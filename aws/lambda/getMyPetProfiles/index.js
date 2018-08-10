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
        `INSERT INTO pet_profile (userId, petName, typeOfAnimal, breed, age, gender) VALUES ('user1', 'Suzie', 'Dog', 'Labradore', '4 months', 'Female')`
      );
    })
    .then(result => {
      console.log(result);
      return connection.query(
        'select * from pet_profile where profileId = LAST_INSERT_ID()'
      );
    })
    .then(result => {
      console.log(result);
      result.forEach(r => console.log(r.petName));
      connection.end();
      callback(null, result);
    })
    .catch(err => {
      console.log(err);
      connection.end();
      callback(err);
    });
};
