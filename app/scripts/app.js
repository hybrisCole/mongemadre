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
  }).run(function($rootScope, $location, facebookService,FBUSERID){
    facebookService.init();
    $rootScope.$on('$routeChangeStart',function(){
      if((FBUSERID.id === -1) && ($location.path() !== '/')){
        $location.path('/main');
      }
    });
  });
