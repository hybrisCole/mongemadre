'use strict';

/**
 * @ngdoc function
 * @name mongemadreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mongemadreApp
 */
angular.module('mongemadreApp')
  .controller('MainCtrl', function ($scope,loginService,pictureService,FBUSERID) {
    $scope.loginFacebook = function(){
      loginService.login();
    };
    $scope.userid = function(){
      pictureService.getPictureURL(FBUSERID.id,300,300).then(function(pictureObj){
        console.log(pictureObj);
      },function(error){
        console.log(error);
      });
    };
  });
