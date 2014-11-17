'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('AdminCtrl', function ($scope, parse, SharedData, Facebook, Title, AppAlert) {
        Title.setTitle('מסך אדמינים');
        $scope.selectedTable = 'adj'; // Defines the selected table
        $scope.tableContent = [];
        $scope.selectedIndex = 0; // For selected database CSS manipulation
        $scope.tables = { // Contain tables as an object for DOM generation
            dishes: {name: 'dishes', size: 0},
            nations: {name: 'nations', size: 0},
            adj: {name: 'adj', size: 0},
            users: {name: 'users', size: 0},
            best: {name: 'best', size: 0}
        };

        // Get all tables content
        function loadTables(update){
            if ($scope.selectedTable !== ''){
                parse.getTable($scope.selectedTable, update)
                    .then(function(response){
                        $scope.tableContent = response;
                    },
                    function(error){
                        AppAlert.add(SharedData.appAlertTypes.DANGER, 'Retrieving from parse failed. ' + error);
                    }
                );
            }
        }

        function loadTableSize(key) {
            parse.getTableSize($scope.tables[key].name)
                .then(function(size) {
                    $scope.tables[key].size = size;
                })
        }

        loadTables(false); // Load all tables

        for(var key in $scope.tables) {
            loadTableSize(key);
        }

        // Remove an item
        $scope.removeDbItem = function(itemId, index){
            if ($scope.selectedTable === 'users' && ($scope.tableContent[index].isAdmin)) {
                AppAlert.add(SharedData.appAlertTypes.DANGER, 'אחי, תהיה קצת יותר אח. אתה לא יכול להעיף אדמין');
                return;
            }
            var item = $scope.tableContent[index];
            item.color = 'rated-pending';
            parse.removeFromParse($scope.selectedTable, itemId)
                .then(function(){
                    $scope.tableContent.splice(index, 1);
                    loadTables(true);
                    loadTableSize($scope.selectedTable);
                },
                function(error){
                    item.color = 'rated-failed';
                    AppAlert.add(SharedData.appAlertTypes.DANGER, 'Item could not be removed from Parse: ' + error);
                });
        };

        // Load selected table
        $scope.selectTable = function(selected){
            $scope.selectedTable = selected;
            loadTables(false);
        };

        // A function to paint the selected table in blue (see the html for full comprehension)
        $scope.itemClicked = function($index) {
            $scope.selectedIndex = $index;
        };
        
  });
