'use strict';

var mongoose = require('mongoose'),
    Class = mongoose.model('Class'),
    _ = require('lodash');

exports.query = function(req, res, next){
  Class
    .find({})
    .lean()
    .exec(function(err, classes){
      if (err) return res.json(500, err);
      var unique = _.uniq(classes, function(c){
        return c.code + c.group;
      });
      
      res.json(200, unique);
    });
};