
'use strict';

angular.module('findmymodApp')
  .controller('InformationCtrl', function ($scope, $modalInstance, course, description, exam, outline) {
    $scope.outline = outline;
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

    if (exam.exam) {
      $scope.exam = exam.exam;
    } else {
      $scope.exam = $scope.dayLabel(exam.day) + ' ' + exam.date + '  ' + exam.start;
    }
    $scope.description = description;
    if (!$scope.description.requirement) {
      $scope.description.requirement = 'None';
    }

    $scope.description.requirement = $scope.description.requirement.replace('Pre-Requisite: ', '');
    $scope.course = course;
  });
