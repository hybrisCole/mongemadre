'use strict';

/**
 * @ngdoc function
 * @name mongemadreApp.controller:FormularioregistroCtrl
 * @description
 * # FormularioregistroCtrl
 * Controller of the mongemadreApp
 */
angular.module('mongemadreApp')
  .controller('FormularioregistroCtrl', function ($scope,$location,$timeout,
                                                  firebaseService,facebookService,mailer) {
    $scope.labelSubmit = 'PARTICIPAR!';
    firebaseService.getUsuario().then(function(data){
      $scope.usuario = data;
    });

    facebookService.getPictureURL().then(function(data){
      $scope.profileImg = data.data.url;
    });
    $scope.submitFormMongeMama = function(){
      $scope.labelSubmit = 'ENVIANDO...';
      console.log('submitFormMongeMama');
      firebaseService.actualizarUsuario($scope.usuario).then(function(){
        console.log('actualizarUsuario');
        $timeout(function(){
          facebookService.actualizarFotoPerfil().then(function(){
            console.log('actualizarFotoPerfil');
            $timeout(function(){
              facebookService.actualizarFotoCover($scope.usuario).then(function(){
                $timeout(function(){
                  console.log('actualizarFotoCover');
                  facebookService.compartirMadreMonge();
                  mailer.submitForm($scope.usuario, $scope.profileImg);
                  $location.path('/cambiarFotos');
                },300);
              },function(err){
                $scope.labelSubmit = 'LISTO!';
                facebookService.compartirMadreMonge();
                console.log(err);
              });
            },300);
          },function(err){
            console.log(err);
          });
        },300);
      },function(err){
        console.log(err);
      });
    };
  });
