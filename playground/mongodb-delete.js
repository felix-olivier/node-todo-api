const {MongoClient, ObjectId} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server', err);
  console.log('Connected to MongoDB server');

  // deleteMany
  /*
  db.collection('Todos').deleteMany({text: 'eat lunch'}).then(result => {
    console.log(result);
  });
  */

  // deleteOne
  /*
  db.collection('Todos').deleteOne({text: 'eat lunch'}).then(result => {
    console.log(result);
  });
  */



  // findOneAndDelete // delete and get back the item
  /*
  db.collection('Todos').findOneAndDelete({completed: false}).then(result => {
    console.log(result);
  });
  */


  ///// Challenge

  // 1. remove duplicates by name
  db.collection('Users').deleteMany({name: 'Felix'}).then(result => {
    console.log(result);
  });


  // 2. Delete a document by id
  // db.collection('Users').findOneAndDelete({
  // _id: new ObjectId('5b61c7a5e5c87c66f2145390')
  // }).then(res => {
  //   console.log(JSON.stringify(res, null, 2));
  // });


  // db.close();
});
