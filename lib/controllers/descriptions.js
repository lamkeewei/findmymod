'use strict';

var mongoose = require('mongoose'),
    Description = mongoose.model('Description');

exports.find = function(req, res, next){
  var query = {
    classNbr: req.params.number
  };

  Description.findOne(query, function(err, description){
    if (err) return res.json(500, err);
    if (!description) return res.send(404);

    res.json(description);
  });
};