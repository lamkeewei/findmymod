'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    classes = require('./controllers/classes'),
    descriptions = require('./controllers/descriptions'),
    exams = require('./controllers/exams'),
    bids = require('./controllers/bids'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {
  // Server API Routes  
  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/classes')
    .get(classes.query);

  app.route('/api/bids')
    .put(bids.query);

  app.route('/api/descriptions/:code')
    .get(descriptions.find);

  app.route('/api/exams/:code')
    .get(exams.find);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};