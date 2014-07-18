'use strict';

/**
 * @ngdoc function
 * @name mongemadreApp.controller:CambiarfotosCtrl
 * @description
 * # CambiarfotosCtrl
 * Controller of the mongemadreApp
 */
angular.module('mongemadreApp')
  .controller('CambiarfotosCtrl', function ($scope,facebookService,firebaseService) {
    $scope.fotoPerfilMonge = facebookService.getFotoPerfilMonge();

    firebaseService.getUsuario().then(function(data){
      $scope.usuario = data;
    });

  });
