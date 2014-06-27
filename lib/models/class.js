'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassSchema = new Schema({
  subject: String,
  code: String,
  title: String,
  day: String,
  start: String,
  end: String,
  instructor: String,
  search: String,
  classNbr: String,
  group: String,
  location: String
});

module.exports = mongoose.model('Class', ClassSchema);