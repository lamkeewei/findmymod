'use strict';

describe('Service: Exams', function () {

  // load the service's module
  beforeEach(module('findmymodApp'));

  // instantiate service
  var Exams;
  beforeEach(inject(function (_Exams_) {
    Exams = _Exams_;
  }));

  it('should do something', function () {
    expect(!!Exams).toBe(true);
  });

});
