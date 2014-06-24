'use strict';

var mongoose = require('mongoose'),
    Exam = mongoose.model('Exam');

exports.find = function(req, res, next){
  var query = {
    code: req.params.code
  };

  Exam.findOne(query, function(err, exam){
    if (err) return res.json(500, err);
    if (!exam) return res.json(200, { exam: 'No Exam' });
    res.json(200, exam);
  });
};