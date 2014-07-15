'use strict';

/**
 * @ngdoc function
 * @name mongemadreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mongemadreApp
 */
angular.module('mongemadreApp')
  .controller('MainCtrl', function ($scope,$location,facebookService) {
    $scope.loginFacebook = function(){
      facebookService.login().then(function(){
        $location.path('/formularioRegistro');
      });
    };
    $scope.userid = function(){
      facebookService.getPictureURL(90,90).then(function(pictureObj){
        console.log(pictureObj);
      },function(error){
        console.log(error);
      });
    };
    $scope.compartirMadreNombre = function(){
      facebookService.compartirMadreMonge();
    };
    $scope.logoutFacebook = function(){
      facebookService.logout();
    };
  });
