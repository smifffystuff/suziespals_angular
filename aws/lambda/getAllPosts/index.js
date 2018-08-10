const mysql = require('promise-mysql');
const db = require('./sqlConfig');

exports.handler = (event, context, callback) => {
  console.log(event);
  let connection;

  mysql
    .createConnection(db)
    .then(conn => {
      console.log('connection established');
      connection = conn;
      return connection.query(`SELECT * FROM post`);
    })
    .then(result => {
      console.log(result);
      connection.end();
      callback(null, result);
    })
    .catch(err => {
      console.log(err);
      connection.end();
      callback(err);
    });
};
