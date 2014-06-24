'use strict';

describe('Service: Description', function () {

  // load the service's module
  beforeEach(module('findmymodApp'));

  // instantiate service
  var Description;
  beforeEach(inject(function (_Description_) {
    Description = _Description_;
  }));

  it('should do something', function () {
    expect(!!Description).toBe(true);
  });

});
