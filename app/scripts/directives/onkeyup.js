'use strict';

/**
 * @ngdoc directive
 * @name shaibaApp.directive:onKeyUp
 * @description
 * # onKeyUp
 */
angular.module('shaibaApp')
  .directive('onKeyupFn', function () {
        return function(scope, elm, attrs) {
            //Evaluate the variable that was passed
            //In this case we're just passing a variable that points
            //to a function we'll call each keyup
            var keyupFn = scope.$eval(attrs.onKeyupFn);
            var allowedKeys = scope.$eval(attrs.keys);
            var inputElement = scope.$eval(attrs.parseClass);
            elm.bind('keyup', function(evt) {
                //$apply makes sure that angular knows
                //we're changing something
                angular.forEach(allowedKeys, function(key) {
                    if (key == evt.which){
                        scope.$apply(function() {
                            keyupFn.call(scope, inputElement, elm.val());
                        });
                    }
                });

            });
        };
    });
