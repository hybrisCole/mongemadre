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
      .otherwise({
        redirectTo: '/'
      });
  }).run(function(FBAPPID){
    FB.init({
      appId: FBAPPID,
      version    : 'v2.0',
      cookie: true,
      xfbml: true
    });
  });
