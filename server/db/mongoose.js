var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Tells mongoose which promise module to use

url = process.env.PORT ? 'mongodb://felixolivier:1nodecourse@ds237192.mlab.com:37192/todoapp' : 'mongodb://localhost:27017/TodoApp';
console.log(url);
mongoose.connect(url); // mongoose waits until connection is ready before performing any operations on it



module.exports = {mongoose};
