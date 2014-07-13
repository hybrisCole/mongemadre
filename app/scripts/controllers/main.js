'use strict';

/**
 * @ngdoc function
 * @name mongemadreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mongemadreApp
 */
angular.module('mongemadreApp')
  .controller('MainCtrl', function ($scope,facebookService,FBUSERID) {
    $scope.loginFacebook = function(){
      facebookService.login();
    };
    $scope.userid = function(){
      facebookService.getPictureURL(FBUSERID.id,300,300).then(function(pictureObj){
        console.log(pictureObj);
      },function(error){
        console.log(error);
      });
    };
    $scope.compartirMadreNombre = function(){
      console.log('!');
    };
  });
