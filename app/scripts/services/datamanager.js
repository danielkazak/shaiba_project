'use strict';

/**
 * @ngdoc service
 * @name shaibaApp.DataManager
 * @description
 * # DataManager
 * Factory in the shaibaApp.
 */
angular.module('shaibaApp')
  .factory('DataManager', function (parse, $q) {
    // Service logic
    // ...
    var self = this;



    // Public API here
    return {
      generateSentence: function() {

          parse.getTable('nations')
              .then(
              /* success function */
              function(data) {
                  self.dishes = data;
              },
              /* error function */
              function(result) {
                  console.log("Failed to get the data, result is " + result);
              });

          parse.getTable('dishes')
              .then(
              /* success function */
              function(data) {
                  self.dishes = data;
              },
              /* error function */
              function(result) {
                  console.log("Failed to get the data, result is " + result);
              });

          parse.getTable('adj')
              .then(
              /* success function */
              function(data) {
                  self.adj = data;
              },
              /* error function */
              function(result) {
                  console.log("Failed to get the data, result is " + result);
              });

          return ;
      }
    };
  });
