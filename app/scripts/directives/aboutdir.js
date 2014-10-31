'use strict';

/**
 * @ngdoc directive
 * @name shaibaApp.directive:aboutDir
 * @description
 * # aboutDir
 */
angular.module('shaibaApp')
  .directive('aboutDir', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the aboutDir directive');
      }
    };
  });
