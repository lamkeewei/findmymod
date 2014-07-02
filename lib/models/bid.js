'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BidSchema = new Schema({
  code: String,
  window: String,
  section: String,
  vacancy: String,
  maxBid: String,
  minBid: String,
  instructor: String,
  round: String,
  type: String,
  semester: String,
  year: String
});

module.exports = mongoose.model('Bid', BidSchema);