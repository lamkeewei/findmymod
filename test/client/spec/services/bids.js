'use strict';

describe('Service: Bids', function () {

  // load the service's module
  beforeEach(module('findmymodApp'));

  // instantiate service
  var Bids;
  beforeEach(inject(function (_Bids_) {
    Bids = _Bids_;
  }));

  it('should do something', function () {
    expect(!!Bids).toBe(true);
  });

});
