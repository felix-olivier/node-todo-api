const {MongoClient, ObjectId} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server', err);
  console.log('Connected to MongoDB server');

  // Update a document and return the original/updated documet
  /*
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectId('5b6ae38b2924b8bc511b7205')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false // when false, returns updated document
  }).then(result => {
    console.log(result);
  });
  */






  /////////// Challenge

  // 1. Update name

  // 2. Increment age by 1
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId('5b61c7a5e5c87c66f2145390')
  }, {
    $set: {
      name: 'Felix'
    },
    $inc: {
      age: -1
    }
  }, {
    returnOriginal: false
  }).then(res => {
    console.log(res);
  });




  // db.close();
});
