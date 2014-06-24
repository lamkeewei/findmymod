'use strict';

angular.module('findmymodApp')
  .factory('Exams', function ($resource) {
    return $resource('/api/exams/:code', {}, {});
  });
