'use strict';

var mongoose = require('mongoose'),
    Outline = mongoose.model('Outline');

exports.find = function(req, res, next){
  var query = {
    code: req.params.code,
    section: req.params.section
  };

  Outline.findOne(query, function(err, outline){
    if (err) return res.json(500, err);
    if (!outline) return res.json(200, { outline: 'No outline' });
    res.json(200, outline);
  });
};