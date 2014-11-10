'use strict';

/**
 * @ngdoc service
 * @name shaibaApp.Title
 * @description
 * # Title
 * Factory in the shaibaApp.
 */
angular.module('shaibaApp')
  .factory('Title', function () {
    // Service logic
    // ...

    var title = 'מחולל שייבה';

    // Public API here
    return {
      getTitle: function () {
        return title;
      },
      setTitle: function(newTitle) {
        title = newTitle;
      }
    };
  });
