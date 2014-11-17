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
            var params = scope.$eval(attrs.keyupParameters);

            elm.bind('keyup', function(evt) {
                //$apply makes sure that angular knows
                //we're changing something
                angular.forEach(params[1], function(key) {
                    if (key === evt.which){
                        scope.$apply(function() {
                            params[0].call(scope, params[2], elm.val());
                            elm.val('');
                        });
                    }
                });

            });
        };
    });
