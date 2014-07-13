'use strict';

describe('Service: FBAPPID', function () {

  // load the service's module
  beforeEach(module('mongemadreApp'));

  // instantiate service
  var FBAPPID;
  beforeEach(inject(function (_FBAPPID_) {
    FBAPPID = _FBAPPID_;
  }));

  it('should do something', function () {
    expect(!!FBAPPID).toBe(true);
  });

});
