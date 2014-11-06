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
            self.dishes = null;
            self.nations = null;
            self.adj = null;
            self.best = null;

            self.getTable = function(tableName) {
                var deferred = $q.defer();

                if (self[tableName] !== null) {
                    deferred.resolve(self[tableName]);
                } else {
                    $http.get('https://api.parse.com/1/classes/' + tableName)
                        .success(function (response) {
                            console.log(response.results);
                            self[tableName] = response.results;
                            deferred.resolve(response.results);
                        })
                        .error(function (response) {
                            deferred.reject(response);
                        });
                }

                return deferred.promise;
            }


            self.getRandom = function(tableName) {
                var deferred = $q.defer();

                self.getTable(tableName)
                    .then(
                    function (response) {
                        deferred.resolve(response[Random(response.length)].name);
                    },
                    function (response) {
                        deferred.reject(response);
                    });

                return deferred.promise;
            }

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



