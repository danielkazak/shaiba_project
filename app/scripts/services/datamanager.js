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
    self.dishes;
    self.nations;
    self.adj;



    // Public API here
    return {
      generateSentence: function() {

      }
    };
  });
