const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _         = require('lodash');



var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (v) =>  validator.isEmail(v),
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: {
    type: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  }
});

UserSchema.methods.toJSON = function() { // Overwrites an (instance?) method -> limits the data that is returned when a user is created
  var user = this;
  var userObject = user.toObject(); // converts mongoose object to regular object (only document data remains)

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() { // creates an instance method
  // Can not use arrow functions, as arrow functions do not bind a this keyword.
  // This stores the individual document, so we need es5 function declaration.

  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'somesecretabc123').toString();

  console.log();

  user.tokens = user.tokens.concat([{access: access, token: token}]);

  return user.save().then(() => {
    return token
  }); // return promise so it can be chained in server.js
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'somesecretabc123')
  } catch (e) {
    return Promise.reject(); // return rejected promise so catch in server.js is called
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};





// Model / scheme for users
var User = mongoose.model('Users', UserSchema);

module.exports = {User};


/*********** EXAMPLE**************/
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
