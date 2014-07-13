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
    var auth =
      new FirebaseSimpleLogin(mongeMadreRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        console.log(user);
      } else {
        // user is logged out
      }
    });
    // Public API here
    return {
      login: function () {
        auth.login('facebook',{
          rememberMe: true,
          scope: 'email,public_profile,user_friends, publish_stream'
        });
      },
      logout:function (){
        auth.logout();
      }
    };
  });
