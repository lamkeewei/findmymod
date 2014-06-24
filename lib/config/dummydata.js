'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Class = mongoose.model('Class'),
  classes = require('./../data/class');

Class.remove().exec();

Class.create(classes, function(err){
  if (err) console.log(err);
  console.log('finished populating classes');
});

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});
