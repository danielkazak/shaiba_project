'use strict';

/**
 * @ngdoc directive
 * @name shaibaApp.directive:FavStar
 * @description
 * # FavStar
 */
angular.module('shaibaApp')
  .directive('favStar', function ($rootScope) {
    return {
      template: '<span ng-click="addToHall()" class="{{ favStarCss }}" tooltip="הוסף להיכל התהילה" tooltip-trigger="mouseenter" tooltip-placement="right"/>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });

