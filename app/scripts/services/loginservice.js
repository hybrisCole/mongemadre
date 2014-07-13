'use strict';

/**
 * @ngdoc service
 * @name mongemadreApp.loginService
 * @description
 * # loginService
 * Factory in the mongemadreApp.
 */
angular.module('mongemadreApp')
  .factory('loginService', function (FIREBASEURL) {
    var mongeMadreRef =
      new Firebase(FIREBASEURL);
    // Public API here
    return {
      login: function () {
        return meaningOfLife;
      }
    };
  });
