'use strict';

var mongoose = require('mongoose'),
    Bid = mongoose.model('Bid'),
    _ = require('lodash');

exports.query = function(req, res, next){
  var query = req.body;

  Bid.find(query, function(err, bids){
    if (err) return res.json(500, err);

    bids = _.sortBy(bids, ['round', 'window']);
    res.json(200, bids);
  });
};