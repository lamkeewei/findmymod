'use strict';

angular.module('findmymodApp')
  .controller('MainCtrl', function ($scope, $http, Class, $filter, _, $modal, Description, Exams, Bids, Outlines) {
    var days = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
    $scope.flags = {
      noMatch: false
    };

    $scope.classes = Class.query(function(classes){
      $scope.classes = classes.sort(function(a, b){
        var numA = Number(a.group.substring(1));
        var numB = Number(b.group.substring(1));
        return numA - numB;
      });
      $scope.courseTitle = _.uniq(_.reduce(classes, function(arr, c){
        arr.push(c.search);
        return arr;
      }, []));
      $scope.professors = _.uniq(_.reduce(classes, function(arr, c){
        arr.push(c.instructor);
        return arr;
      }, []));

      $scope.days = days;
    });
    $scope.search = {};

    $scope.updateProfessors = function(filtered){
      var professors = _.reduce(filtered, function(arr, c){
        arr.push(c.instructor);
        return arr;
      }, []);

      $scope.professors = _.uniq(professors);
    };

    $scope.updateDays = function(filtered){
      var days = _.reduce(filtered, function(arr, c){
        arr.push(c.day);
        return arr;
      }, []);

      $scope.days = _.uniq(days);
      $scope.days.sort(function(a, b){
        return $scope.dayNumber(a) - $scope.dayNumber(b);
      });
    };

    $scope.updateClass = function(filtered){
      $scope.courseTitle = _.uniq(_.reduce(filtered, function(arr, c){
        arr.push(c.search);
        return arr;
      }, []));
    };

    $scope.$watch('search', function(newVal, oldVal){
      var filtered = $filter('filter')($scope.classes, newVal);
      var clearSearch = !newVal.search && oldVal.search;
      var clearDay = !newVal.day && oldVal.day;
      var clearInstructor = !newVal.instructor && oldVal.instructor;

      $scope.flags.noMatch = filtered.length < 1;

      if (newVal.instructor !== oldVal.instructor) {
        $scope.updateDays(filtered);
        $scope.updateClass(filtered);
      } else if (newVal.day !== oldVal.day) {
        $scope.updateProfessors(filtered);
        $scope.updateClass(filtered);
      } else {
        $scope.updateDays(filtered);
        $scope.updateProfessors(filtered);
      }

      if (clearSearch) {
        $scope.reset();
      }

      if (clearDay) {
        $scope.updateDays(filtered);
      }

      if (clearInstructor) {
        $scope.updateProfessors(filtered);
      }
    }, true);

    $scope.reset = function(){
      $scope.search = {};
      $scope.updateProfessors($scope.classes);
      $scope.updateClass($scope.classes);
      $scope.days = days;
    };

    $scope.onSelect = function(item, model, label){
      console.log(item, model, label);
    };

    $scope.dayLabel = function(day){
      switch(day) {
        case 'MON':
          return 'Monday';
        case 'TUE':
          return 'Tuesday';
        case 'WED':
          return 'Wednesday';
        case 'THU':
          return 'Thursday';
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

    $scope.dayNumber = function(day){
      switch(day) {
        case 'MON':
          return 1;
        case 'TUE':
          return 2;
        case 'WED':
          return 3;
        case 'THU':
          return 4;
        case 'FRI':
          return 5;
        case 'SAT':
          return 6;
        default:
          return 0;
      }
    };

    $scope.getInfo = function(course){
      var modalInstance = $modal.open({
        templateUrl: 'partials/information',
        controller: 'InformationCtrl',
        resolve: {
          course: function(){
            return course;
          },
          description: function(){
            return Description.get({code: course.code}).$promise;
          },
          exam: function(){
            return Exams.get({ code: course.code }).$promise;
          },
          outline: function(){
            var query = {
              code: course.code,
              section: course.group
            };
            return Outlines.get(query).$promise;
          }
        }
      });
    };

    $scope.getBidHistory = function(course){
      var modalInstance = $modal.open({
        templateUrl: 'partials/history',
        controller: 'HistoryCtrl',
        resolve: {
          course: function(){
            return course;
          },
          bids: function(){
            var query = {
              code: course.code,
              instructor: course.instructor
            };

            return Bids.getBids(query).$promise;
          }
        }
      });
    };
  });
