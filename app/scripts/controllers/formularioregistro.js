'use strict';

/**
 * @ngdoc function
 * @name mongemadreApp.controller:FormularioregistroCtrl
 * @description
 * # FormularioregistroCtrl
 * Controller of the mongemadreApp
 */
angular.module('mongemadreApp')
  .controller('FormularioregistroCtrl', function ($scope,firebaseService,facebookService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    firebaseService.getUsuario().then(function(data){
      $scope.usuario = data;
    });
    $scope.submitFormMongeMama = function(){
      firebaseService.actualizarUsuario($scope.usuario).then(function(){
        facebookService.actualizarFotoPerfil().then(function(data){
          facebookService.compartirMadreMonge(data.id);
        },function(err){
          console.log(err);
        });
      });
    };
  });
