const mongoose = require('mongoose');

var Schema = mongoose.Schema({
  title: String,
  detail: String
});

module.exports = mongoose.model('Model', Schema);
