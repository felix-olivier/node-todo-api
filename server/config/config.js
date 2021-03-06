var env = process.env.NODE_ENV || 'development';
console.log('**********', env);


if (env === 'development' || env === 'test') {
  var config = require('./config.json'); /*automatically parsed by require*/
  var envConfig = config[env];
  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
  });
}
