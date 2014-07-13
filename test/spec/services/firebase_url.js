'use strict';

describe('Service: FIREBASEURL', function () {

  // load the service's module
  beforeEach(module('mongemadreApp'));

  // instantiate service
  var FIREBASEURL;
  beforeEach(inject(function (_FIREBASEURL_) {
    FIREBASEURL = _FIREBASEURL_;
  }));

  it('should do something', function () {
    expect(!!FIREBASEURL).toBe(true);
  });

});
