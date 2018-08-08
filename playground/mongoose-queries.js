const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

 // var id = '5b6b04d85b84bbb63e40b2a41';
 // if (!ObjectID.isValid(id)) {
 //   console.log('ID not valid');
 // }

// Find -> arr with results / no match -> []
/*
 Todo.find({
   _id: id
 }).then((todos) => {
   console.log('Todos', todos);
 });
 */

// Find one -> object with first result / no match -> null
/*
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});
*/

// Find by id / no match -> null
/*
Todo.findById(id).then((todo) => {
  if (!todo) return (console.log('Id not found'))
  console.log('Todo by id', todo);
}).catch(e => {
  console.log(e);
});
*/



//// // Challenge find user by id
var userId = '5b6af0514c24bb4d309d8908';

User.findById(userId).then(user => {
  if (!user) return console.log('user not found');
  console.log('found user', user);
}, (e) => {
  console.log(e);
});
