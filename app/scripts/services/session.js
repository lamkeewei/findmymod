'use strict';

angular.module('findmymodApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
