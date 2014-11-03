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

        //  Create a class that represents our parse service.
        function Parse() {

            var self = this;

            //    Initially the data is null
            self.dish = null;
            self.nation = null;
            self.adj = null;

            //    getData returns a promise which when fulfilled returns the data.
            self.getDish = function() {

                var deferred = $q.defer();

                if(self.dish !== null) {
                    deferred.resolve(self.dish[Random(self.dish.length)].name); // + " (from Cache!)" for testing on console
                } else {
                    $http.get('https://api.parse.com/1/classes/dishes')
                        .success(function(response) {
                            console.log(response.results);
                            self.dish = response.results;
                            deferred.resolve(response.results[Random(response.results.length)].name); //  + " (from Server!)" for testing on console
                        })
                        .error(function(response) {
                            deferred.reject(response);
                        });
                }

                return deferred.promise;
            };

            self.getNation = function() {

                var deferred = $q.defer();

                if(self.nation !== null) {
                    deferred.resolve(self.nation[Random(self.nation.length)].name); // + " (from Cache!)" for testing on console
                } else {
                    $http.get('https://api.parse.com/1/classes/nations')
                        .success(function(response) {
                            console.log(response.results);
                            self.nation = response.results;
                            deferred.resolve(response.results[Random(response.results.length)].name); //  + " (from Server!)" for testing on console
                        })
                        .error(function(response) {
                            deferred.reject(response);
                        });
                }

                return deferred.promise;
            };

            self.getAdj = function() {

                var deferred = $q.defer();

                if(self.adj !== null) {
                    deferred.resolve(self.adj[Random(self.adj.length)].name); // + " (from Cache!)" for testing on console
                } else {
                    $http.get('https://api.parse.com/1/classes/adj')
                        .success(function(response) {
                            console.log(response.results); // Log the received objects to console
                            self.adj = response.results; // Populate the self.data array with received objects
                            deferred.resolve(response.results[Random(response.results.length)].name); //  + " (from Server!)" for testing on console
                        })
                        .error(function(response) {
                            deferred.reject(response);
                        });
                }

                return deferred.promise;
            };

            self.postToparse = function(table, val){
                var deferred = $q.defer();
                $http.post('https://api.parse.com/1/classes/' + table, {name: val}).
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        deferred.resolve(val + " posted to " + table);
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        deferred.reject(val + " wasnt posted. Reason: " + status)
                    });
                return deferred.promise;
            };

        }
        return new Parse();
  });



