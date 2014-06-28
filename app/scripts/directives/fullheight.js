'use strict';

angular.module('findmymodApp')
  .directive('fullHeight', function ($window) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var dialog = document.querySelector('.modal-content');

        var setMinHeight = function(){
          if ($window.innerWidth <= 768) {
            var el = angular.element(dialog);
            el.css('min-height', $window.innerHeight + 'px');
          }
        };

        angular.element($window).bind('resize', function(event) {
          setMinHeight();
        });

        setMinHeight();
      }
    };
  });
