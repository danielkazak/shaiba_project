'use strict';

describe('Controller: HallCtrl', function () {

  // load the controller's module
  beforeEach(module('shaibaApp'));

  var HallCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HallCtrl = $controller('HallCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
