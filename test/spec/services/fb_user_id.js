'use strict';

describe('Service: FBUSERID', function () {

  // load the service's module
  beforeEach(module('mongemadreApp'));

  // instantiate service
  var FBUSERID;
  beforeEach(inject(function (_FBUSERID_) {
    FBUSERID = _FBUSERID_;
  }));

  it('should do something', function () {
    expect(!!FBUSERID).toBe(true);
  });

});
