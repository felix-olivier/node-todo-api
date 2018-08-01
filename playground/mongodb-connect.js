// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

/* Examples
  // Destructuring
  var user ={name: 'felix', age: 25};
  var {name} = user;
  console.log(name);

  // object ids from mongoDB
  var obj = new ObjectId();
  console.log(obj);

examples end*/



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server', err);
  console.log('Connected to MongoDB server');

  /*db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) return console.log('Unable to insert todo', err);
    console.log(JSON.stringify(result.ops, null, 2));
  });*/

  /*db.collection('Users').insertOne({
    name: 'Felix',
    age: 25,
    locatiom: 'the Hague'
  }, (err, result) => {
    if (err) return console.log('Unable to insert user', err);
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), null, 2));
    console.log();
  });*/

  db.close();
});
