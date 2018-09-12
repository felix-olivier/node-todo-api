const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users= [{
  _id: userOneId,
  email: 'felix@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'somesecretabc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'egg@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, 'somesecretabc123').toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator:userOneId
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 10,
  _creator:userTwoId
}];


const populateTodos = (done) => { // empties database, re-populates & finishes before any other test is executed
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => { /*Cant use insertMany, because mongoose middleware for 'save' will not be used to hash passwords */
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
