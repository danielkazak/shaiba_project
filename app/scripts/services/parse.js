'use strict';

/**
 * @ngdoc service
 * @name shaibaApp.parse
 * @description
 * # parse
 * Factory in the shaibaApp.
 */
angular.module('shaibaApp')
  .factory('parse', function ($http, $q) {
        // Service logic
        // ...
        // Initialize headers for Shaiba_Generator at parse.com
        $http.defaults.headers.common["X-Parse-Application-Id"] = "SyCWUj76oNwCrRpfvO2B5gdkm9uKvMkHNyEjZwCJ";
        $http.defaults.headers.common["X-Parse-REST-API-Key"] = "ykKXzomRdgxjdWPjPnhqcLFD7OmxAZbavzYOpIwr";

        // Random function
        function Random(num){
            return Math.floor(Math.random() * num);
        }

        function GetParse() {

            var self = this;

            //    Initially the data is null
            self.data = null;

            //    getData returns a promise which when fulfilled returns the data.
            self.getData = function() {

                //    Create a deferred operation.
                var deferred = $q.defer();

                //    If we already have the data, we can resolve the promise.
                if(self.data !== null) {
                    // Resolve cached objects from self.data as promise
                    deferred.resolve(self.data[Random(self.data.length)].dishName + " (from Cache!)");
                } else {
                    //    Get the data from the server.
                    $http.get('https://api.parse.com/1/classes/dishes')
                        .success(function(response) {
                            console.log(response.results); // Log the received objects to console
                            self.data = response.results; // Populate the self.data array with received objects
                            // Resolve received objects as promise
                            deferred.resolve(response.results[Random(response.results.length)].dishName + " (from Server!)");
                        })
                        .error(function(response) {
                            deferred.reject(response);
                        });
                }

                //    Now return the promise.
                return deferred.promise;
            };
        }

        return new GetParse();
  });



