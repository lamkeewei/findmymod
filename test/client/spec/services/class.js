'use strict';

describe('Service: Class', function () {

  // load the service's module
  beforeEach(module('findmymodApp'));

  // instantiate service
  var Class;
  beforeEach(inject(function (_Class_) {
    Class = _Class_;
  }));

  it('should do something', function () {
    expect(!!Class).toBe(true);
  });

});
