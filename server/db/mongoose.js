var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Tells mongoose which promise module to use

url = process.env.MONGODB_URI;
mongoose.connect(url); // mongoose waits until connection is ready before performing any operations on it



module.exports = {mongoose};
