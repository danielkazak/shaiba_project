'use strict';

/**
 * @ngdoc function
 * @name shaibaApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the shaibaApp
 */
angular.module('shaibaApp')
  .controller('AdminCtrl', function ($scope, parse, SharedData, Facebook, Title, AppAlert, $timeout) {
        Title.setTitle('Admin Panel');
        $scope.selectedTable = 'adj'; // Defines the selected table
        $scope.tableContent;
        $scope.selectedIndex = 0; // For selected database CSS manipulation
        loadTables(false); // Load all tables
        $scope.tables = { // Contain tables as an object for DOM generation
            dishes: {name: 'dishes'},
            nations: {name: 'nations'},
            adj: {name: 'adj'}
        }

        // Get all tables content
        function loadTables(update){
            if ($scope.selectedTable !== ''){
            parse.getTable($scope.selectedTable, update)
                .then(function(response){
                    $scope.tableContent = response;
                },
                function(error){
                    AppAlert.add(SharedData.appAlertTypes.DANGER, 'Retrieving from parse failed.');
                }
            );
            }
        }

        // Remove an item
        $scope.removeDbItem = function(itemId, index){
            var item = $scope.tableContent[index];
            item.color = 'rated-pending';
            parse.removeFromParse($scope.selectedTable, itemId)
                .then(function(response){
                    $scope.tableContent.splice(index, 1);
                    loadTables(true);
                },
                function(error){
                    item.color = 'rated-failed';
                    AppAlert.add(SharedData.appAlertTypes.DANGER, 'Item could not be removed from Parse: ' + error);
                });
        }

        // Load selected table
        $scope.selectTable = function(selected){
            $scope.selectedTable = selected;
            loadTables(false);
        }

        // A function to paint the selected table in blue (see the html for full comprehension)
        $scope.itemClicked = function ($index) {
            $scope.selectedIndex = $index;
        }
        
  });
