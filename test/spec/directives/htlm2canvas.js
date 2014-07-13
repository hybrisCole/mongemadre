'use strict';

describe('Directive: htlm2canvas', function () {

  // load the directive's module
  beforeEach(module('mongemadreApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<htlm2canvas></htlm2canvas>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the htlm2canvas directive');
  }));
});
