'use strict';

describe('Service: Outlines', function () {

  // load the service's module
  beforeEach(module('findmymodApp'));

  // instantiate service
  var Outlines;
  beforeEach(inject(function (_Outlines_) {
    Outlines = _Outlines_;
  }));

  it('should do something', function () {
    expect(!!Outlines).toBe(true);
  });

});
