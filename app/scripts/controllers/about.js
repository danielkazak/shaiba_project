'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('AboutCtrl', function ($scope, parse, AppAlert) {

        // Send attributes to class attribute for directive (so onkeyup can send attribute directly)
        $scope.dishes = 'dishes';
        $scope.nations = 'nations';
        $scope.adj = 'adj';

        // Page title

        $scope.postData = function(parseTable, parseVal) {
            var data = {name: parseVal};
            parse.postToparse(parseTable, data)
                .then(function(response){
                    console.log(response);
                    AppAlert.add('success', parseVal + ' נוסף בהצלחה.', 2000);
                },
                function(error){
                    console.log("ERROR: " + error);
                    AppAlert.add('danger', parseVal + 'לא התווסף, שגיאה:' + error, 2000);
                });
        };
  });
