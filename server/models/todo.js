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
  }
});


//// // Example code to create new todo
// var newTodo = new Todo({
//   text: 'Cook dinner',
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

module.exports = {Todo};
