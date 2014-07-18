'use strict';

/**
 * @ngdoc function
 * @name mongemadreApp.controller:CambiarfotosCtrl
 * @description
 * # CambiarfotosCtrl
 * Controller of the mongemadreApp
 */
angular.module('mongemadreApp')
  .controller('CambiarfotosCtrl', function ($scope,facebookService) {
    $scope.fotoPerfilMonge = facebookService.getFotoPerfilMonge();
  });
