'use strict';

describe('Service: AppAlert', function () {

  // load the service's module
  beforeEach(module('shaibaApp'));

  // instantiate service
  var AppAlert;
  beforeEach(inject(function (_AppAlert_) {
    AppAlert = _AppAlert_;
  }));

  it('should do something', function () {
    expect(!!AppAlert).toBe(true);
  });

});
