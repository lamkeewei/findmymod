'use strict';

angular.module('findmymodApp')
  .factory('Class', function ($resource) {
    return $resource('/api/classes/:id', {}, {});
  });
