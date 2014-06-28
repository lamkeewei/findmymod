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

      var removed = _.xor(unique, classes);
      removed.forEach(function(r){
        var course = _.find(unique, { code: r.code, group: r.group });
        if (r.instructor !== course.instructor) {
          course.instructor += ' & ' + r.instructor;
          return;
        }
        
        if (!course.otherDates){
          course.otherDates = [];       
        }

        var date = {
          day: r.day,
          start: r.start,
          end: r.end
        };


        course.otherDates.push(date);
      });

      res.json(200, unique);
    });
};