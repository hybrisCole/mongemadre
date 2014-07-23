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
      console.log('submitFormMongeMama');
      firebaseService.actualizarUsuario($scope.usuario).then(function(){
        console.log('firebaseService.actualizarUsuario success');
        facebookService.actualizarFotoPerfil().then(function(){
          console.log('facebookService.actualizarFotoPerfil success');
          facebookService.actualizarFotoCover($scope.usuario).then(function(){
            console.log('facebookService.actualizarFotoCover success');
            facebookService.compartirMadreMonge();
            mailer.submitForm($scope.usuario, $scope.profileImg);
            $location.path('/cambiarFotos');
          },function(err){
            console.log(err);
          });
        },function(err){
          console.log(err);
        });
      },function(err){
        console.log(err);
      });
    };
  });
