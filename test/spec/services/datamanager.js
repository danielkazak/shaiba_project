'use strict';

describe('Service: DataManager', function () {

  // load the service's module
  beforeEach(module('shaibaApp'));

  // instantiate service
  var DataManager;
  beforeEach(inject(function (_DataManager_) {
    DataManager = _DataManager_;
  }));

  it('should do something', function () {
    expect(!!DataManager).toBe(true);
  });

});
