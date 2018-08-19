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
        `SELECT * FROM pet where userId = '${event.userId}'`
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

storeImage = (event, petId) => {
  return new Promise((resolve, reject) => {
    const profileImage = event.profileImage;
    if (profileImage && profileImage !== '') {
      var buf = Buffer.from(
        profileImage.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );

      const data = {
        Bucket: 'images.suziespals.co.uk',
        Key: `profile/${petId}.jpg`,
        Body: buf,
        ContentType: 'image/jpg',
        ACL: 'public-read'
      };
      s3.putObject(data, function(err, res) {
        if (err) {
          console.log(err);
          console.log('Error uploading data: ', res);
          reject(err);
        } else {
          console.log('successfully uploaded the image!');
          console.log(res);
          resolve(true);
        }
      });
    } else {
      console.log('no profile image');
      resolve(false);
    }
  });
};
