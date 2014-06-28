'use strict';

angular.module('findmymodApp')
  .factory('Description', function ($resource) {
    return $resource('/api/descriptions/:number', {}, {});
  });
