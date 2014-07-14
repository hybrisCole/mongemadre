'use strict';

/**
 * @ngdoc function
 * @name mongemadreApp.controller:FormularioregistroCtrl
 * @description
 * # FormularioregistroCtrl
 * Controller of the mongemadreApp
 */
angular.module('mongemadreApp')
  .controller('FormularioregistroCtrl', function ($scope,firebaseService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    firebaseService.getUsuario().then(function(data){
      $scope.usuario = data;
    });
  });
