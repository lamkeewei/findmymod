
'use strict';

angular.module('findmymodApp')
  .controller('InformationCtrl', function ($scope, $modalInstance, course, description) {
    $scope.description = description;
    if (!$scope.description.requirement) {
      $scope.description.requirement = 'None';
    }
    $scope.course = course;
  });
