'use strict';
const AWS = require('aws-sdk');
const rds = new AWS.RDS();

const mysql = require('mysql');
const db = require('./sqlConfig');

const fs = require('fs');

const sqlCreate = fs.readFileSync(__dirname + '/suziespals_tables.sql') + '';

const dbConn = mysql.createConnection({
  ...db,
  multipleStatements: true
});

const createDbStructure = new Promise((resolve, reject) => {
  dbConn.query(sqlCreate, (err, result) => {
    if (err) reject(err);
    resolve(
      'Database Structure Succesfully created and lookup tables populated!'
    );
  });
});

createDbStructure
  .then(res => {
    console.log(res);
    dbConn.end();
  })
  .catch(err => {
    console.log(`err: ${err}`);
    if (JSON.stringify(err).includes('ER_TABLE_EXISTS_ERROR')) {
      console.log('Table structure already exists aborting!');
    }
    dbConn.end();
  });
