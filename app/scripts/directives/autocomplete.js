'use strict';

/**
 * @ngdoc directive
 * @name shaibaApp.directive:autocomplete
 * @description
 * # autocomplete
 */
angular.module('shaibaApp')
  .directive('autocomplete', function ($timeout) {
        return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                        iElement.trigger('input');
                    }, 0);
                }
            });
        };
  });
