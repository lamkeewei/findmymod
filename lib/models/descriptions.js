'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DescriptionSchema = new Schema({
  code: String,
  group: String,
  classNbr: String,
  description: String,
  link: String,
  requirement: String,
  grading: String,
  units: String,
  availability: {
    total: String,
    enrolled: String,
    reserved: String,
    available: String
  },
  exam: {
    date: String,
    day: String,
    start: String,
    end: String
  },
  areas: [String]
});

module.exports = mongoose.model('Description', DescriptionSchema);