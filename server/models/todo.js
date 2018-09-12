var mongoose = require('mongoose');

// Model/scheme for Todos
var Todo = mongoose.model('Todo', { /*first argument is collection name */
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

module.exports = {Todo}; /* Todo allows for collection operations (find, save, etc)*/
