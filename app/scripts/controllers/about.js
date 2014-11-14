'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('AboutCtrl', function ($scope, parse, AppAlert, Title, SharedData, $q) {
        Title.setTitle(SharedData.siteTitles.SETTINGS);
        // Send attributes to class attribute for directive (so onkeyup can send attribute directly)
        $scope.dishes = 'dishes';
        $scope.nations = 'nations';
        $scope.adj = 'adj';

        var checkValidation = function(tableName, value) {
            var deferred = $q.defer();
            var state = SharedData.validationStates.VALID;

            parse.getTable(tableName, false)
                .then(
                function(table) {
                    if (state === SharedData.validationStates.VALID && value === '') {
                        state = SharedData.validationStates.EMPTY;
                    }
                    if (state === SharedData.validationStates.VALID &&
                        (value.length > 20 || value.length < 2)) {
                        state = SharedData.validationStates.WRONG_LENGTH;
                    }
                    if (state === SharedData.validationStates.VALID) {
                        for (var i = 0; i < table.length; i++) {
                            if (table[i].name === value) {
                                state = SharedData.validationStates.ALREADY_EXISTS;
                            }
                        }
                    }
                    deferred.resolve(state);
                },
                function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        $scope.postData = function(parseTable, parseVal) {

            checkValidation(parseTable, parseVal)
                .then(function(state) {
                    if (state === SharedData.validationStates.VALID) {
                        var data = {name: parseVal};
                        parse.postToparse(parseTable, data)
                            .then(function (response) {
                                parse.getTable(parseTable, true);
                                console.log(response);
                                AppAlert.add(SharedData.appAlertTypes.SUCCESS, parseVal + SharedData.validationStates.VALID, 4000);
                            },
                            function (error) {
                                console.log("ERROR: " + error);
                                AppAlert.add(SharedData.appAlertTypes.DANGER, parseVal + 'לא התווסף, שגיאה:' + error);
                            });
                    } else {
                        AppAlert.add(SharedData.appAlertTypes.WARNING, state, 4000);
                    }
                },
                function(error) {

                });



        };
  });
