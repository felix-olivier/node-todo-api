const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

/*Todo.remove({}).then((result) => { // remove all matching query (this case all)
  console.log(result);
});*/

// Todo.findOneAndRemove() // returns doc
// Todo.findByIdAndRemove() // returns doc

Todo.findOneAndRemove(_id: '5b86a91c5d640864e1623cc5').then(todo => {
  console.log(todo);
});

Todo.findByIdAndRemove('5b86a91c5d640864e1623cc5').then(todo => {
  console.log(todo);
});
