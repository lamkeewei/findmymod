'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExamSchema = new Schema({
  code: String,
  date: String,
  day: String,
  start: String,
  title: String
});

module.exports = mongoose.model('Exam', ExamSchema);