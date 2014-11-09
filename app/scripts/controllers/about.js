'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('AboutCtrl', function ($scope, parse, AppAlert, $rootScope) {

        // Send attributes to class attribute for directive (so onkeyup can send attribute directly)
        $scope.dishes = 'dishes';
        $scope.nations = 'nations';
        $scope.adj = 'adj';

        // Page title

        $scope.postData = function(parseTable, parseVal) {
            console.log("User " + $rootScope.fbUserName + " initiated action."); // DEBUG
            parse.postToparse(parseTable, parseVal)
                .then(function(response){
                    console.log(response);
                    $scope.status = response;
                    AppAlert.add('success', parseVal + ' נוסף בהצלחה.', 2000);
                },
                function(error){
                    console.log("ERROR: " + error);
                    $scope.status = error;
                    AppAlert.add('danger', parseVal + 'לא התווסף, שגיאה:' + error, 2000);
                });
        };
  });
