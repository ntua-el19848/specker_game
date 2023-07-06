var mongoose = require('mongoose');

/* define a userSchema with attributes: name, lastname, lastLogin, email */
const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  lastLogin: String,
  email: String,
});

module.exports = mongoose.model('UserInfo', userSchema);