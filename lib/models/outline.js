'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OutlineSchema = new Schema({
  code: String,
  section: String,
  link: String
});

module.exports = mongoose.model('Outline', OutlineSchema);