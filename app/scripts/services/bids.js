'use strict';

angular.module('findmymodApp')
  .factory('Bids', function ($resource) {
    return $resource('/api/bids', {}, {
      getBids: {
        method: 'PUT',
        isArray: true
      }
    });
  });
