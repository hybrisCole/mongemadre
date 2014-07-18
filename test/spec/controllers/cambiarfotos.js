'use strict';

describe('Controller: CambiarfotosCtrl', function () {

  // load the controller's module
  beforeEach(module('mongemadreApp'));

  var CambiarfotosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CambiarfotosCtrl = $controller('CambiarfotosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
