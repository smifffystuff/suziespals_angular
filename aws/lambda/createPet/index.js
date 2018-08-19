const mysql = require('promise-mysql');
const db = require('./sqlConfig');
// const AWS = require('aws-sdk');
// const s3 = new AWS.S3({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
  console.log(event);
  let connection;
  let newPet;

  // INSERT INTO `suziespals`.`pet_profile` (`userId`, `petName`, `typeOfAnimal`, `breed`, `age`, `gender`) VALUES ('user1', 'Suzie', 'Dog', 'Labradore', '4 months', 'Female');

  mysql
    .createConnection(db)
    .then(conn => {
      console.log('connection established');
      connection = conn;
      return connection.query(
        `INSERT INTO pet (userId, name, animalType, breed, age, gender, bio, profileImage) VALUES (
          '${event.userId}','${event.name}', '${event.animalType}', '${
          event.breed
        }','${event.age}',
          '${event.gender}', '${event.bio}', '${event.profileImage}'
        )`
      );
    })
    .then(result => {
      console.log(result);
      return connection.query(
        'select * from pet where petId = LAST_INSERT_ID()'
      );
    })
    // .then(result => {
    //   newPet = result;
    //   return storeImage(event, event.userId + '-' + result.petId);
    // })
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

// storeImage = (event, petId) => {
//   return new Promise((resolve, reject) => {
//     const profileImage = event.profileImage;
//     if (profileImage && profileImage !== '') {
//       console.log('starting');
//       var buf = Buffer.from(
//         profileImage.replace(/^data:image\/\w+;base64,/, ''),
//         'base64'
//       );
//       console.log('buffer created');
//       const data = {
//         Bucket: 'images.suziespals.co.uk',
//         Key: `profile/${petId}.jpg`,
//         Body: buf,
//         ContentType: 'image/jpg',
//         ACL: 'public-read'
//       };
//       console.log('Uploading image to S3');
//       s3.putObject(data, function(err, res) {
//         if (err) {
//           console.log(err);
//           console.log('Error uploading data: ', res);
//           reject(err);
//         } else {
//           console.log('successfully uploaded the image!');
//           console.log(res);
//           resolve(true);
//         }
//       });
//     } else {
//       console.log('no profile image');
//       resolve(false);
//     }
//   });
// };
