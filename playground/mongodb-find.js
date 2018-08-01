const {MongoClient, ObjectId} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server', err);
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectId('5b61c704ea70b266beb4c738')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, null, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to count todos', err);
  // });

  db.collection('Users').find({
    name: 'Felix'
  }).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, null, 2));
  }, (err) => {
    console.log('Unable to fetch users', err);
  });

  db.collection('Users').find({
    name: 'Felix'
  }).count().then((count) => {
    console.log('Users found', count);
  }, (err) => {
    console.log('Unable to count users', err);
  });


  // db.close();
});
