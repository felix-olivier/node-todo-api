var mongoose = require('mongoose');

// Model / scheme for users
var User = mongoose.model('Users', {
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    lowercase: true
  }
});

//// // Example code to save new user
// var newUser = new User({
//   email: ' felixvandeelen@hotmail.Com'
// })
//
// newUser.save()
// .then((doc) => {
//   console.log('Saved todo', JSON.stringify(doc, null, 2));
// }).catch(e => {
//   console.log('Unable to save todo');
//   console.log(e);
// });

module.exports = {User};
