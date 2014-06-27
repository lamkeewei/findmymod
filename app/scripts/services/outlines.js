'use strict';

angular.module('findmymodApp')
  .factory('Outlines', function ($resource) {
    return $resource('/api/outlines/:code/:section', {}, {});
  });
