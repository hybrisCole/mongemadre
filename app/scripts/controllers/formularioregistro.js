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
                                                  firebaseService,facebookService,mailer) {
    firebaseService.getUsuario().then(function(data){
      $scope.usuario = data;
    });

    facebookService.getPictureURL().then(function(data){
      $scope.profileImg = data.data.url;
    });
    $scope.submitFormMongeMama = function(){
      firebaseService.actualizarUsuario($scope.usuario).then(function(){
        facebookService.actualizarFotoPerfil().then(function(data){
          facebookService.compartirMadreMonge(data.id);
          console.log($scope.usuario);
          mailer.submitForm($scope.usuario, $scope.profileImg);
          $location.path('/cambiarFotos');
        },function(err){
          console.log(err);
        });
      });
    };
  });
