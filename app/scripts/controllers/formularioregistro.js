'use strict';

/**
 * @ngdoc function
 * @name mongemadreApp.controller:FormularioregistroCtrl
 * @description
 * # FormularioregistroCtrl
 * Controller of the mongemadreApp
 */
angular.module('mongemadreApp')
  .controller('FormularioregistroCtrl', function ($scope,$location,
                                                  firebaseService,facebookService) {
    firebaseService.getUsuario().then(function(data){
      $scope.usuario = data;
    });
    $scope.submitFormMongeMama = function(){
      firebaseService.actualizarUsuario($scope.usuario).then(function(){
        facebookService.actualizarFotoPerfil().then(function(data){
          facebookService.compartirMadreMonge(data.id);
          $location.path('/cambiarFotos');
        },function(err){
          console.log(err);
        });
      });
    };
  });
