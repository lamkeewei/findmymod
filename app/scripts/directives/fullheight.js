'use strict';

angular.module('findmymodApp')
  .directive('fullHeight', function ($window) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var dialog = document.querySelector('.modal-content');

        var setMinHeight = function(){
          var el = angular.element(dialog);
          if ($window.innerWidth <= 768) {
            el.css('min-height', $window.innerHeight + 'px');
          } else {
            el.css('min-height', '0px');
          }
        };

        angular.element($window).bind('resize', function(event) {
          setMinHeight();
        });

        setMinHeight();
      }
    };
  });
