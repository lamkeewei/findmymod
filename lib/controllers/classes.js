'use strict';

var mongoose = require('mongoose'),
    Class = mongoose.model('Class');

exports.query = function(req, res, next){
  Class
    .find({})
    .exec(function(err, classes){
      if (err) return res.json(500, err);
      res.json(200, classes);
    });
};