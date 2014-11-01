'use strict';

/**
 * @ngdoc service
 * @name shaibaApp.parse
 * @description
 * # parse
 * Factory in the shaibaApp.
 */
angular.module('shaibaApp')
  .factory('parse', function ($http) {
    // Service logic
    // ...

    var meaningOfLife = 42;
    var response = 'test';

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },

      getParse: function (table){
          // Initialize headers for Shaiba_Generator at parse.com
          $http.defaults.headers.common["X-Parse-Application-Id"] = "SyCWUj76oNwCrRpfvO2B5gdkm9uKvMkHNyEjZwCJ";
          $http.defaults.headers.common["X-Parse-REST-API-Key"] = "ykKXzomRdgxjdWPjPnhqcLFD7OmxAZbavzYOpIwr";

          // Execute GET from desired table
          return $http.get('https://api.parse.com/1/classes/' + table);


      }
    };
  });
