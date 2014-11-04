'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('AboutCtrl', function ($scope, parse) {

        // Send attributes to class attribute for directive (so onkeyup can send attribute directly)
        $scope.dishes = 'dishes';
        $scope.nations = 'nations';
        $scope.adj = 'adj';

        // Page title
        $scope.title = '!עזור לשייבה, תן לו השראה';

        $scope.postData = function(parseTable, parseVal) {
            parse.postToparse(parseTable, parseVal)
                .then(function(response){
                    console.log(response);
                    $scope.status = response;
                    $('#alert_placeholder')
                        .html('<div class="alert alert-success"><a href="#/about" class="close"  data-dismiss="alert">&times;</a><strong>'
                            + parseVal + '</strong> .נוסף בהצלחה</div>');
                },
                function(error){
                    console.log("ERROR: " + error);
                    $('#alert_placeholder')
                        .html('<div class="alert alert-danger"><a href="" class="close" data-dismiss="alert">&times;</a><strong> ' +
                            ''+ parseVal + '</strong> .לא התווסף, שגיאה: <strong>'+ error + '</strong></div>');
                    $scope.status = error;
                });
        };
  });
