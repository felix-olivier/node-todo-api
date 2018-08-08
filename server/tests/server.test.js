const expect  = require('expect');
const request = require('supertest');

const {app}   = require('./../server');
const {Todo}   = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done()); // empties database & finishes before any other test is executed
});

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

        Todo.find().then((todos) => {
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
          expect(todos.length).toBe(0);
          done()
        }).catch(e => done(e));

      });
  });
});
