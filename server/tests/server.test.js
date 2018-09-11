const expect     = require('expect');
const request    = require('supertest');
const {ObjectID} = require('mongodb')

const {app}      = require('./../server');
const {Todo}     = require('./../models/todo');
const {User}     = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

const nrOfDocs = todos.length

beforeEach(populateUsers);
beforeEach(populateTodos, populateUsers);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text}) /*supertest converts to JSON automatically*/
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err); // return stops funcion execution
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e)); // Attach catch incase todo.find crashes
      });
  });


  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Todo.find().then(todos => {
          expect(todos.length).toBe(nrOfDocs);
          done()
        }).catch(e => done(e));
      });
  });
});




describe('GET /todos', () => {
  it('should get all todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(nrOfDocs);
      })
      .end(done);
  });
});


describe('GET /todos/:id', () => {
  it('should return todo doc', done => {

    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });


  it('should return a 404 if todo not found', done => {
    // 404 should be returned
    request(app)
      .get(`/todos/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });


  it('should return a 400 for non-object ids', done => {
    request(app)
      .get(`/todos/123`)
      .expect(400)
      .end(done);
  });
});


describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    //
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then(todo => {
          expect(todo).toNotExist();
          done();
        }).catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', done => {
    request(app)
      .delete(`/todos/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', done => {
    request(app)
      .delete(`/todos/123`)
      .expect(400)
      .end(done);
  });
});


describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {

    var hexId = todos[0]._id.toHexString();
    request(app)
      .patch(`/todos/${hexId}`)
      .send({text: 'Updated from unit test', completed: true})
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then(todo => {
          expect(todo.text).toBe('Updated from unit test');
          expect(todo.completed).toBe(true);
          expect(todo.completedAt).toBeA('number');
          done();
        });
      });
  });

  it('should clear completedAt when todo is not completed', done => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .patch(`/todos/${hexId}`)
      .send({text: 'Second update from unit test', completed: false})
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then(todo => {
          expect(todo.text).toBe('Second update from unit test');
          expect(todo.completed).toBe(false);
          expect(todo.completedAt).toNotExist();
          done();
        });
      });
  });
});


describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me/')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
})

describe('POST /users', () => {

  it('should create a user', (done) => {
    var email ='example@example.com';
    var password = '123sdg';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        });
      });
  });

  it('should return validation errors if request invalid', (done) => {
    // invalid password and email
    email = 'notanemail';
    password = 'abc'
    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    // use an email that is already in db
    email = users[0].email;
    password = 'abc123'
    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });


});
