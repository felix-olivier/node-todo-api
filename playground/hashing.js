// const {SHA256} = require('crypto-js');
//
// // var message = 'I am user number four';
// // var hash = SHA256(message).toString();
// //
// // console.log(`Message: ${message}`);
// // console.log(`Hash: ${hash}`);
// //
// // var data = {
// //   id: 4
// // };
// //
// // var token = {
// //   data,
// //   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// // };
// // // somesecret is the salt
// //
// // // /*Man in the middle example: changed data by a user 4 that wants to delete user 5s data*/
// // // token.data.id = 5
// // // token.hash = SHA256(JSON.stringify(token.data)).toString();
// // // // hash is not the same because salt is only known on server
// //
// //
// // var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// //
// // if (resultHash === token.hash) {
// //   console.log('Data was not changed');
// // } else {
// //   console.log('data was changed. dont trust');
// // }
//
// /** Above is example only, instead use jsonwebtoken package**/
//
// const jwt = require('jsonwebtoken');
//
// var data = {
//   id: 10
// };
//
//
//
// var token = jwt.sign(data, 'somesecret');
// console.log(token);
//
// var decoded = jwt.verify(token, 'somesecret');
// console.log(decoded);


const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10 /*the number of rounds*/, (err, salt) => {
//   bcrypt.hash(password, salt,  (err, hash) => {
//       console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$JGxKvBaRk/YqfZPOM1h9TOKAeo1NpQGRcAjX5rXYXCa.QZCneHKke';
bcrypt.compare(password, hashedPassword, (err, res) => {
  /*res -> true if matching*/
  console.log(res);
});
