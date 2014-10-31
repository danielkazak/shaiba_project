'use strict';

describe('Directive: aboutDir', function () {

  // load the directive's module
  beforeEach(module('shaibaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<about-dir></about-dir>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the aboutDir directive');
  }));
});
