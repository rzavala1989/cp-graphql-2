const mongoose = require('mongoose');
const MONGODB_URI = require('./keys');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});

module.exports = mongoose.connection;
