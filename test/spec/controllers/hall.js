'use strict';

describe('Controller: HallctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('shaibaApp'));

  var HallctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HallctrlCtrl = $controller('HallctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
