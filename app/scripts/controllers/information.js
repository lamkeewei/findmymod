
'use strict';

angular.module('findmymodApp')
  .controller('InformationCtrl', function ($scope, $modalInstance, course, description) {
    $scope.description = description;
    $scope.dayLabel = function(day){
      switch(day) {
        case 'MON':
          return 'Monday';
        case 'TUE':
          return 'Tuesday';
        case 'WED':
          return 'Wednesday';
        case 'THUR':
          return 'Thursday';
        case 'FRI':
          return 'Friday';
        case 'SAT':
          return 'Saturday';
        default:
          return 'Sunday';
      }
    };

    if (!$scope.description.exam) {
      $scope.exam = 'No Exam';
    } else {
      var exam = $scope.description.exam;
      $scope.exam = $scope.dayLabel(exam.day.toUpperCase()) + ' ' + exam.date + '  ' + exam.start + ' - ' + exam.end;
    }
 
    if (!$scope.description.requirement) {
      $scope.description.requirement = 'None';
    }

    $scope.description.areas = $scope.description.areas.sort(function(a, b){
      return a.length - b.length;
    });
    $scope.description.areas = $scope.description.areas.join(', ');
    $scope.description.requirement = $scope.description.requirement.replace('Pre-Requisite: ', '');
    $scope.course = course;
  });
