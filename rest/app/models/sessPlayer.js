const mongoose = require('mongoose');

var Schema = mongoose.Schema({
  playerId: String,
  positionId: String
});

module.exports = mongoose.model('Session', Schema);
