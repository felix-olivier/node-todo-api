var env = process.env.NODE_ENV || 'development';
console.log('**********', env);


if (env === 'development') {
  process.env.PORT = 3010;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3010;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if (env === 'production') {
  process.env.MONGODB_URI = 'mongodb://felixolivier:1nodecourse@ds237192.mlab.com:37192/todoapp';
}
