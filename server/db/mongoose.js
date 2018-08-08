var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Tells mongoose which promise module to use
mongoose.connect('mongodb://localhost:27017/TodoApp'); // mongoose waits until connection is ready before performing any operations on it

module.exports = {mongoose};
