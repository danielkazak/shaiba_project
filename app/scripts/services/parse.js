'use strict';

/**
 * @ngdoc service
 * @name shaibaApp.parse
 * @description
 * # parse
 * Factory in the shaibaApp.
 */
angular.module('shaibaApp')
  .factory('parse', function ($http, $q, ngProgress, SharedData) {
        // Service logic
        // ...
        // Initialize headers for Shaiba_Generator at parse.com
        $http.defaults.headers.common['X-Parse-Application-Id'] = 'SyCWUj76oNwCrRpfvO2B5gdkm9uKvMkHNyEjZwCJ';
        $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'ykKXzomRdgxjdWPjPnhqcLFD7OmxAZbavzYOpIwr';

        // Random function
        function getRandomNumber(num){
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
            self.users = null;

            self.getTable = function(tableName, update) {
                var deferred = $q.defer();

                if (!update && self[tableName] !== null) {
                    deferred.resolve(self[tableName]);
                } else {
                    ngProgress.start();
                    $http.get('https://api.parse.com/1/classes/' + tableName)
                        .success(function(response) {
                            //console.log(response.results);
                            self[tableName] = response.results;
                            deferred.resolve(response.results);
                            ngProgress.complete();
                        })
                        .error(function(response) {
                            deferred.reject(response);
                            ngProgress.complete();
                        });
                }
                return deferred.promise;
            };

            self.getRandom = function(table) {
                var deferred = $q.defer();

                if(typeof table === 'string') {
                    self.getTable(table, false)
                        .then(
                        function (response) {
                            deferred.resolve(response[getRandomNumber(response.length)]);
                        },
                        function (response) {
                            deferred.reject(response);
                        });
                } else {
                    deferred.resolve(table[getRandomNumber(table.length)]);
                }

                return deferred.promise;
            };

            self.postToParse = function(table, rowData) {
                var deferred = $q.defer();
                ngProgress.start();
                $http.post('https://api.parse.com/1/classes/' + table, rowData).
                    success(function() {
                        // this callback will be called asynchronously
                        ngProgress.complete();
                        deferred.resolve(JSON.stringify(rowData) + ' posted to ' + table);
                    }).
                    error(function(data, status) {
                        // called asynchronously if an error occurs
                        ngProgress.complete();
                        deferred.reject(data.name + ' wasn\'t posted. Reason: ' + status);
                    });
                return deferred.promise;
            };

            self.putToParse = function(table, column, data) {
                var deferred = $q.defer();
                $http.put('https://api.parse.com/1/classes/' + table + '/' + column, data).
                    success(function() {
                        deferred.resolve(SharedData.parseResponse.SUCCESS);
                    }).
                    error(function() {
                        deferred.reject(SharedData.parseResponse.FAILED);
                    });
                return deferred.promise;
            };

            self.removeFromParse = function(table, data) {
                var deferred = $q.defer();
                $http.delete('https://api.parse.com/1/classes/' + table + '/' + data).
                    success(function() {
                        deferred.resolve(SharedData.parseResponse.SUCCESS);
                    }).
                    error(function() {
                        deferred.reject(SharedData.parseResponse.FAILED);
                    });
                return deferred.promise;
            };

            self.getTableSize = function(tableName) {
                var deferred = $q.defer();

                if (self[tableName] !== null) {
                    deferred.resolve(self[tableName].length);
                } else {
                    ngProgress.start();
                    $http.get('https://api.parse.com/1/classes/' + tableName)
                        .success(function(response) {
                            console.log(response.results);
                            self[tableName] = response.results;
                            deferred.resolve(response.results.length);
                            ngProgress.complete();
                        })
                        .error(function(response) {
                            deferred.reject(response);
                            ngProgress.complete();
                        });
                }
                return deferred.promise;
            };

            self.getRandomDishes = function() {
                var deferred = $q.defer();

                var singleMaleDishes = ['סמבוסק'];
                var pluralMaleDishes = ['זיתים'];
                var singleFemaleDishes = ['פיצה'];
                var pluralFemaleDishes = ['פטריות'];

                self.getTable('dishes', false)
                    .then(function(table) {
                        for(var i = 0; i < table.length; i++) {
                            if(table[i].isMale) {
                                if(!table[i].isPlural) {
                                    if(table[i].name !== 'סמבוסק') { singleMaleDishes.push(table[i].name); }
                                } else {
                                    if(table[i].name !== 'זיתים') { pluralMaleDishes.push(table[i].name); }
                                }
                            } else if(!table[i].isPlural) {
                                if(table[i].name !== 'פיצה') { singleFemaleDishes.push(table[i].name); }
                            } else {
                                if(table[i].name !== 'פטריות') { pluralFemaleDishes.push(table[i].name); }
                            }
                        }

                        var first = self.getRandom(singleMaleDishes);
                        var second = self.getRandom(pluralMaleDishes);
                        var third = self.getRandom(singleFemaleDishes);
                        var forth = self.getRandom(pluralFemaleDishes);
                        $q.all([first, second, third, forth])
                            .then(function(data) {
                                var randomDishes = [];
                                randomDishes.push(data[0]);
                                randomDishes.push(data[1]);
                                randomDishes.push(data[2]);
                                randomDishes.push(data[3]);
                                deferred.resolve(randomDishes);
                            });
                    });

                return deferred.promise;
            }

        }
        return new Parse();
  });



