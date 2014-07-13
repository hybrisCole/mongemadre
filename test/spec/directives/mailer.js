'use strict';

describe('Directive: mailer', function () {

  // load the directive's module
  beforeEach(module('mongemadreApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mailer></mailer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mailer directive');
  }));
});
