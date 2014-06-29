'use strict';

angular.module('findmymodApp')
  .controller('MainCtrl', function ($scope, $http, Class, $filter, _, $modal, Description, Bids, localStorageService, moment, $q) {
    var days = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
    $scope.flags = {
      noMatch: false,
      showSelected: false,
      conflictExams: false,
      conflictClass: false,
    };

    $scope.saveToStorage = function(){
      localStorageService.remove('selected');
      localStorageService.add('selected', $scope.selected);
    };

    $scope.classes = Class.query(function(classes){
      $scope.classes = classes.sort(function(a, b){
        if (a.code === b.code) {
          return Number(a.group.substring(1)) - Number(b.group.substring(1));
        } else {
          return a.code.localeCompare(b.code);
        }
      });

      $scope.courseTitle = _.uniq(_.reduce(classes, function(arr, c){
        arr.push(c.search);
        return arr;
      }, []));

      $scope.courseTitle = $scope.courseTitle.sort();

      $scope.professors = _.uniq(_.reduce(classes, function(arr, c){
        arr.push(c.instructor);
        return arr;
      }, []));
      $scope.professors = $scope.professors.sort();

      $scope.days = days;

      var stored = localStorageService.get('selected');

      if (stored) {
        $scope.selected = stored;
        var all = [];
        Object.keys($scope.selected).forEach(function(day){
          all = all.concat($scope.selected[day]);
        });

        all.forEach(function(course){
          var match = _.filter($scope.classes, {code: course.code, group: course.group});
          match[0].saved = true;
        });
      } else {
        $scope.selected = {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: []
        };

        localStorageService.add('selected', $scope.selected);
      }
    });
    $scope.search = {};

    $scope.updateProfessors = function(filtered){
      var professors = _.reduce(filtered, function(arr, c){
        arr.push(c.instructor);
        return arr;
      }, []);

      $scope.professors = _.uniq(professors);
      $scope.professors = $scope.professors.sort();
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
      $scope.courseTitle = $scope.courseTitle.sort();
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

      if ($scope.flags.showSelected) {
        $scope.getSelected();
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
            return Description.get({number: course.classNbr}).$promise;
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

    $scope.toggleMode = function(){
      $scope.reset();
      $scope.flags.showSelected = !$scope.flags.showSelected;
      if ($scope.flags.showSelected) {
        $scope.getSelected();
      }
    };

    $scope.selectedCount = function(){
      var count = _.filter($scope.classes, { saved: true }).length;
      return count;
    };

    $scope.getSelected = function(){
      var filtered = $filter('filter')($scope.classes, $scope.search);
      $scope.selected = {
        Monday: _.filter(filtered, function(c){
          var cond1 = c.saved && c.day === 'MON';
          var cond2 = false;

          if (c.saved && c.otherDates) {
            c.otherDates.forEach(function(cc){
              if (cc.day === 'MON') {
                cond2 = true;
              }
            });
          }

          return cond1 || cond2;
        }),
        Tuesday: _.filter(filtered, function(c){
          var cond1 = c.saved && c.day === 'TUE';
          var cond2 = false;

          if (c.saved && c.otherDates) {
            c.otherDates.forEach(function(cc){
              if (cc.day === 'TUE') {
                cond2 = true;
              }
            });
          }

          return cond1 || cond2;
        }),
        Wednesday: _.filter(filtered, function(c){
          var cond1 = c.saved && c.day === 'WED';
          var cond2 = false;

          if (c.saved && c.otherDates) {
            c.otherDates.forEach(function(cc){
              if (cc.day === 'WED') {
                cond2 = true;
              }
            });
          }

          return cond1 || cond2;
        }),
        Thursday: _.filter(filtered, function(c){
          var cond1 = c.saved && c.day === 'THU';
          var cond2 = false;

          if (c.saved && c.otherDates) {
            c.otherDates.forEach(function(cc){
              if (cc.day === 'THU') {
                cond2 = true;
              }
            });
          }

          return cond1 || cond2;
        }),
        Friday: _.filter(filtered, function(c){
          var cond1 = c.saved && c.day === 'FRI';
          var cond2 = false;

          if (c.saved && c.otherDates) {
            c.otherDates.forEach(function(cc){
              if (cc.day === 'FRI') {
                cond2 = true;
              }
            });
          }

          return cond1 || cond2;
        }),
        Saturday: _.filter(filtered, function(c){
          var cond1 = c.saved && c.day === 'SAT';
          var cond2 = false;

          if (c.saved && c.otherDates) {
            c.otherDates.forEach(function(cc){
              if (cc.day === 'SAT') {
                cond2 = true;
              }
            });
          }

          return cond1 || cond2;
        })
      };

      var toNumber = function(el){
        return Number(el.start);
      };

      $scope.selected = {
        Monday: _.sortBy($scope.selected.Monday, toNumber),
        Tuesday: _.sortBy($scope.selected.Tuesday, toNumber),
        Wednesday: _.sortBy($scope.selected.Wednesday, toNumber),
        Thursday: _.sortBy($scope.selected.Thursday, toNumber),
        Friday: _.sortBy($scope.selected.Friday, toNumber),
        Saturday: _.sortBy($scope.selected.Saturday, toNumber)
      };

      if ($scope.flags.showSelected) {
        $scope.updateStatus();
      }

      $scope.saveToStorage();
    };

    $scope.updateStatus = function(){
      // Merge all the courses
      var all = [];
      var conflicts = [];
      Object.keys($scope.selected).forEach(function(day){
        all = all.concat($scope.selected[day]);
      });

      all.forEach(function(c){
        c.conflict = false;
      });

      var checkOverlap = function(a, b){
        var cond1 = a.start.isBefore(b.end) || a.start.isSame(b.end);
        var cond2 = a.end.isAfter(b.start) || a.end.isSame(b.start);
        return cond1 && cond2;
      };

      // Check class overlap
      $scope.flags.conflictClass = false;
      var getClassStartEnd = function(c){
        return {
          start: moment(c.start, 'HH:mm'),
          end: moment(c.end, 'HH:mm')
        };
      };

      all.forEach(function(first){
        var firstClass = getClassStartEnd(first);
        var firstCode = first.code + first.group;
        all.forEach(function(second){
          var secondCode = second.code + second.group;
          if (firstCode !== secondCode) {
            var secondClass = getClassStartEnd(second);
            if (first.day === second.day && checkOverlap(firstClass, secondClass)) {
              $scope.flags.conflictClass = true;
              conflicts.push(first);
            }
          }
        });
      });

      // Check class exam
      $scope.flags.conflictExams = false;

      var getExamStartEnd = function(exam){
        var startStr = exam.date + ' ' + exam.start;
        var endStr = exam.date + ' ' + exam.end;

        return {
          start: moment(startStr, 'DD-MMM-YYY HH:mm'),
          end: moment(endStr, 'DD-MMM-YYY HH:mm')
        };
      };

      var exams = {};
      var promises = [];
      all.forEach(function(c){
        var description = Description.get({number: c.classNbr}, function(d){
          exams[c.classNbr] = d;
        }).$promise;
        promises.push(description);
      });

      $q.all(promises).then(function(){
        all.forEach(function(first){
          if (exams[first.classNbr].exam) {
            var firstExam = getExamStartEnd(exams[first.classNbr].exam);
            var firstCode = first.code + first.group;
            all.forEach(function(second){
              var secondCode = second.code + second.group;
              if (firstCode !== secondCode && exams[second.classNbr].exam) {
                var secondExam = getExamStartEnd(exams[second.classNbr].exam);
                if (checkOverlap(firstExam, secondExam)) {
                  $scope.flags.conflictExams = true;
                  conflicts.push(first);
                }
              }
            });
          }
        });

        conflicts.forEach(function(c){
          c.conflict = true;
        });
      });
    };

    $scope.selectCourse = function(course) {
      course.saved = !course.saved;
      $scope.getSelected();
    };
  });
