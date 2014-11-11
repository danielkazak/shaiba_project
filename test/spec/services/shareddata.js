'use strict';

describe('Service: SharedData', function () {

  // load the service's module
  beforeEach(module('shaibaApp'));

  // instantiate service
  var SharedData;
  beforeEach(inject(function (_SharedData_) {
    SharedData = _SharedData_;
  }));

  it('should do something', function () {
    expect(!!SharedData).toBe(true);
  });

});
