'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('AboutCtrl', function ($scope, parse, AppAlert, Title, SharedData, $q, $modal) {
        Title.setTitle(SharedData.siteTitles.SETTINGS);
        // Send attributes to class attribute for directive (so onkeyup can send attribute directly)
        $scope.dishes = 'dishes';
        $scope.nations = 'nations';
        $scope.adj = 'adj';

        var addNew = function(parseTable, parseVal) {
            var data = {name: parseVal};
            parse.postToParse(parseTable, data)
                .then(function (response) {
                    parse.getTable(parseTable, true);
                    console.log(response);
                    AppAlert.add(SharedData.appAlertTypes.SUCCESS, parseVal + SharedData.validationStates.VALID, 4000);
                },
                function (error) {
                    console.log("ERROR: " + error);
                    AppAlert.add(SharedData.appAlertTypes.DANGER, parseVal + 'לא התווסף, שגיאה:' + error);
                });
        }

        var checkValidation = function(tableName, value) {
            var deferred = $q.defer();
            var state = SharedData.validationStates.VALID;

            parse.getTable(tableName, false)
                .then(
                function(table) {
                    if (value === '') {
                        state = SharedData.validationStates.EMPTY;
                    }
                    if (state === SharedData.validationStates.VALID &&
                        (value.length > 20 || value.length < 2)) {
                        state = SharedData.validationStates.WRONG_LENGTH;
                    }
                    for (var i = 0; i < table.length && state === SharedData.validationStates.VALID; i++) {
                        if (table[i].name === value) {
                            state = SharedData.validationStates.ALREADY_EXISTS;
                        }
                    }
                    deferred.resolve(state);
                },
                function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        var addNewDish = function(dishToAdd) {

            var addDishModalInstance = $modal.open({
                templateUrl: 'addDishModal.html',
                controller: 'AddDishModalCtrl',
                resolve: {
                    dishName: function() {
                        return dishToAdd;
                    }
                }
            });

            addDishModalInstance.result.then(function(suffix) {
                var isDishMale;
                var isDishPlural;
                switch(suffix) {
                    case SharedData.suffixOptions.SINGLE_MALE:
                    default:
                        isDishMale = true;
                        isDishPlural = false;
                        break;
                    case SharedData.suffixOptions.PLURAL_MALE:
                        isDishMale = true;
                        isDishPlural = false;
                        break;
                    case SharedData.suffixOptions.SINGLE_FEMALE:
                        isDishMale = false;
                        isDishPlural = false;
                        break;
                    case SharedData.suffixOptions.PLURAL_FEMALE:
                        isDishMale = false;
                        isDishPlural = true;
                }
                var data = {name: dishToAdd, isMale: isDishMale, isPlural: isDishPlural};
                parse.postToParse('dishes', data)
                    .then(function(response) {
                        parse.getTable('dishes', true);
                        console.log(response);
                        AppAlert.add(SharedData.appAlertTypes.SUCCESS,
                                dishToAdd + SharedData.validationStates.VALID, 4000);
                    }, function(error) {
                        console.log("ERROR: " + error);
                        AppAlert.add(SharedData.appAlertTypes.DANGER,
                                dishToAdd + 'לא התווסף, שגיאה:' + error);
                    })
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        }

        var addNewAdj = function(adjToAdd) {
            var data = {name: adjToAdd};
            parse.postToParse('adj', data)
                .then(function (response) {
                    parse.getTable('adj', true);
                    console.log(response);
                    AppAlert.add(SharedData.appAlertTypes.SUCCESS, adjToAdd + SharedData.validationStates.VALID, 4000);
                }, function (error) {
                    console.log("ERROR: " + error);
                    AppAlert.add(SharedData.appAlertTypes.DANGER, adjToAdd + 'לא התווסף, שגיאה:' + error);
                });
        }

        var addNewNation = function(nationToAdd) {
            var data = {name: nationToAdd};
            parse.postToParse('nations', data)
                .then(function (response) {
                    parse.getTable('nations', true);
                    console.log(response);
                    AppAlert.add(SharedData.appAlertTypes.SUCCESS, nationToAdd + SharedData.validationStates.VALID, 4000);
                }, function (error) {
                    console.log("ERROR: " + error);
                    AppAlert.add(SharedData.appAlertTypes.DANGER, nationToAdd + 'לא התווסף, שגיאה:' + error);
                });
        }

        $scope.postData = function(parseTable, parseVal) {
            checkValidation(parseTable, parseVal)
                .then(function(state) {
                    if (state === SharedData.validationStates.VALID) {
                        if (parseTable === 'dishes') {
                            addNewDish(parseVal);
                        } else if (parseTable === 'nations') {
                            addNewNation(parseVal);
                        } else if (parseTable === 'adj') {
                            addNewAdj(parseVal);
                        }
                    } else {
                        AppAlert.add(SharedData.appAlertTypes.WARNING, state, 4000);
                    }
                }, function(error) {
                    AppAlert.add(SharedData.appAlertTypes.DANGER, 'אנא נסה שוב, נוצרה שגיאה: ' + error);
                });
        }

  }).controller('AddDishModalCtrl', function($scope, $modalInstance, dishName, parse, SharedData) {
        $scope.displayDish = dishName;
        $scope.displayNation = 'ישראלי';
        parse.getRandom('nations')
            .then(function(nation) {
                if (nation.name[nation.name.length-1] === 'י') {
                    $scope.displayNation = nation.name;
                }
            }, function(error) {
                console.log(error);
            });

        $scope.suffixOptions = [SharedData.suffixOptions.SINGLE_MALE, SharedData.suffixOptions.PLURAL_MALE,
            SharedData.suffixOptions.SINGLE_FEMALE, SharedData.suffixOptions.PLURAL_FEMALE];
        $scope.correctSuffix = SharedData.suffixOptions.SINGLE_MALE;

        $scope.ok = function() {
            $modalInstance.close($scope.correctSuffix);
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    });
