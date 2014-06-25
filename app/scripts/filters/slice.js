'use strict';

angular.module('findmymodApp')
  .filter('slice', function (_) {
    return function (input, opt) {
      if (opt.pos === 1) {
        return input;
      }

      var index = opt.num * (opt.pos - 1);
      return input.splice(index);
    };
  });
