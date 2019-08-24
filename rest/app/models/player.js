const mongoose = require('mongoose');

var Schema = mongoose.Schema({
  handle: String,
  outfit: String
});

module.exports = mongoose.model('Player', Schema);
