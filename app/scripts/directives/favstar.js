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
      template: '<span ng-click="addToHall()" class="{{ favStarCss }}"/>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });

