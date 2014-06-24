'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DescriptionSchema = new Schema({
  code: String,
  description: String,
  requirement: String,
  title: String
});

module.exports = mongoose.model('Description', DescriptionSchema);