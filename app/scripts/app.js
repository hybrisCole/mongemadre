'use strict';

/**
 * @ngdoc overview
 * @name mongemadreApp
 * @description
 * # mongemadreApp
 *
 * Main module of the application.
 */
angular
  .module('mongemadreApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/formularioRegistro', {
        templateUrl: 'views/formularioregistro.html',
        controller: 'FormularioregistroCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function($rootScope, $location, facebookService,FBUSERID,FIREBASEURL){
    var authRef = new Firebase(FIREBASEURL);
    var auth = new FirebaseSimpleLogin(authRef,function(){});
    auth.login('password', {
      email: 'acpii2005@gmail.com',
      password: '123Queso'
    });
    facebookService.init().then(function(){
      $rootScope.$on('$routeChangeStart',function(){
        if((FBUSERID.id === -1) && ($location.path() !== '/')){
          $location.path('/main');
        }
      });
    });
  });
