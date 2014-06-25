'use strict';

angular.module('findmymodApp')
  .controller('HistoryCtrl', function ($scope, $http, course, bids, _) {
    $scope.originalBids = bids;
    $scope.bids = bids;
    $scope.course = course;
    $scope.state = {};
    $scope.state.currentPage = 1;
    $scope.state.round = '';
    $scope.rounds = [
      {
        round: '1',
        window: '1'
      }, {
        round: '1',
        window: '2'
      }, {
        round: '1A',
        window: '1'
      }, {
        round: '1A',
        window: '2'
      }, {
        round: '1B',
        window: '1'
      }, {
        round: '1B',
        window: '2'
      }, {
        round: '2',
        window: '1'
      }, {
        round: '2',
        window: '2'
      }, {
        round: '2',
        window: '3'
      }, {
        round: '2A',
        window: '1'
      }, {
        round: '2A',
        window: '2'
      }, {
        round: '2A',
        window: '3'
      }
    ];

    $scope.$watchCollection('[state.round, state.semester]', function(newVal, oldVal){
      $scope.state.currentPage = 1;
      var filter = {};

      if (newVal[0]) {
        var round = $scope.rounds[newVal[0]];
        filter.round = round.round;
        filter.window = round.window;
      }

      if (newVal[1]) {
        filter.semester = newVal[1];
      }

      if(_.isEmpty(filter)) {
        $scope.bids = bids;
      } else {
        $scope.bids = _.filter(bids, filter);
      }
    });

    $scope.toTwoDecimal = function(num){
      return Number(num).toFixed(2);
    };

    $scope.reset = function(){
      $scope.state.round = '';
      $scope.state.semester = '';
    };
  });
