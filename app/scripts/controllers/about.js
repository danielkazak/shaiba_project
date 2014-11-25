'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('AboutCtrl', ['$scope', 'parse', 'AppAlert', 'Title', 'SharedData', '$q', '$modal',
        function ($scope, parse, AppAlert, Title, SharedData, $q, $modal) {
        Title.setTitle(SharedData.siteTitles.SETTINGS);
        // Send attributes to class attribute for directive (so onkeyup can send attribute directly)
        $scope.dishes = 'dishes';
        $scope.nations = 'nations';
        $scope.adj = 'adj';

        var addNew = function(parseTable, data, name) {
            parse.postToParse(parseTable, data)
                .then(function(response) {
                    parse.getTable(parseTable, true);
                    console.log(response);
                    AppAlert.add(SharedData.appAlertTypes.SUCCESS,
                            name + SharedData.validationStates.VALID, 4000);
                }, function(error) {
                    console.log('ERROR: ' + error);
                    AppAlert.add(SharedData.appAlertTypes.DANGER,
                            name + 'לא התווסף, שגיאה:' + error);
                });
        };

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
        };

        var addNewDish = function(dishToAdd) {

            var addDishModalInstance = $modal.open({
                templateUrl: 'views/Partials/addDishModal.html',
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
                        isDishMale = true;
                        isDishPlural = false;
                        break;
                    case SharedData.suffixOptions.PLURAL_MALE:
                        isDishMale = true;
                        isDishPlural = true;
                        break;
                    case SharedData.suffixOptions.SINGLE_FEMALE:
                        isDishMale = false;
                        isDishPlural = false;
                        break;
                    case SharedData.suffixOptions.PLURAL_FEMALE:
                        isDishMale = false;
                        isDishPlural = true;
                        break;
                    default:
                        break;
                }
                var data = {name: dishToAdd, isMale: isDishMale, isPlural: isDishPlural};
                addNew('dishes', data, dishToAdd);
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        var addNewAdj = function(adjToAdd) {
            var addDishModalInstance = $modal.open({
                size: 'lg',
                templateUrl: 'views/Partials/AddAdjectiveModal.html',
                controller: 'AddAdjectiveModalCtrl',
                resolve: {
                    adjName: function() {
                        return adjToAdd;
                    }
                }
            });

            addDishModalInstance.result.then(function(versions) {
                var data = {name: adjToAdd};
                if((versions[SharedData.hebrewOptionsEnum.SINGLE_MALE] === versions[SharedData.hebrewOptionsEnum.PLURAL_MALE]) &&
                    (versions[SharedData.hebrewOptionsEnum.SINGLE_MALE] === versions[SharedData.hebrewOptionsEnum.SINGLE_FEMALE]) &&
                    (versions[SharedData.hebrewOptionsEnum.SINGLE_MALE] === versions[SharedData.hebrewOptionsEnum.PLURAL_FEMALE])) {
                    data.isSame = true;
                    data.versions = {};
                } else {
                    data.isSame = false;
                    data.versions = versions;
                }
                addNew('adj', data, adjToAdd);
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        var addNewNation = function(nationToAdd) {
            var data = {name: nationToAdd};
            addNew('nations', data, nationToAdd);
        };

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
        };

  }]).controller('AddDishModalCtrl', ['$scope', '$modalInstance', 'dishName', 'parse', 'SharedData',
    function($scope, $modalInstance, dishName, parse, SharedData) {
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
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]).controller('AddAdjectiveModalCtrl', ['$scope', '$modalInstance', 'adjName', 'parse', 'SharedData', 'AppAlert',
        function($scope, $modalInstance, adjName, parse, SharedData, AppAlert) {
        parse.getRandomDishes()
            .then(function(data) {
                $scope.displayAdjectives = [
                    {name: adjName, approved: false, dish: data[0]},
                    {name: adjName, approved: false, dish: data[1]},
                    {name: adjName, approved: false, dish: data[2]},
                    {name: adjName, approved: false, dish: data[3]}
                ];
            });

        $scope.ok = function() {
            var areApproved = true;
            for(var i = 0; i < $scope.displayAdjectives.length && areApproved; i++) {
                if(!$scope.displayAdjectives[i].approved) {
                    areApproved = false;
                }
            }
            if(areApproved) {
                var toSend = {};
                toSend[SharedData.hebrewOptionsEnum.SINGLE_MALE] = $scope.displayAdjectives[SharedData.hebrewOptionsEnum.SINGLE_MALE].name;
                toSend[SharedData.hebrewOptionsEnum.PLURAL_MALE] = $scope.displayAdjectives[SharedData.hebrewOptionsEnum.PLURAL_MALE].name;
                toSend[SharedData.hebrewOptionsEnum.SINGLE_FEMALE] = $scope.displayAdjectives[SharedData.hebrewOptionsEnum.SINGLE_FEMALE].name;
                toSend[SharedData.hebrewOptionsEnum.PLURAL_FEMALE] = $scope.displayAdjectives[SharedData.hebrewOptionsEnum.PLURAL_FEMALE].name;
                $modalInstance.close(toSend);
            } else {
                AppAlert.add(SharedData.appAlertTypes.DANGER, 'תאשר קודם את כל המשפטים יא חנון');
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.textChanged = function(index) {
            $scope.displayAdjectives[index].approved = true;
        };

        $scope.allAdjClicked = function() {
            var newValue = !$scope.allAdjMet();
            _.each($scope.displayAdjectives, function (adj) {
                adj.approved = newValue;
            });
        };

        $scope.allAdjMet = function() {
            var needsMet = _.reduce($scope.displayAdjectives, function (memo, adj) {
                return memo + (adj.approved ? 1 : 0);
            }, 0);

            return (needsMet === $scope.displayAdjectives.length);
        };

    }]);