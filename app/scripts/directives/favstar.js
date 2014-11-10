'use strict';

/**
 * @ngdoc directive
 * @name shaibaApp.directive:FavStar
 * @description
 * # FavStar
 */
angular.module('shaibaApp')
  .directive('favStar', function () {
    return {
      template: ' <span ng-click="addToHall" class="glyphicon glyphicon-star favstar pull-left"/>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
