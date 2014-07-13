'use strict';

/**
 * @ngdoc service
 * @name mongemadreApp.facebookService
 * @description
 * # facebookService
 * Factory in the mongemadreApp.
 */
angular.module('mongemadreApp')
  .factory('facebookService', function ($q, FIREBASEURL,FBUSERID) {

    var mongeMadreRef =
      new Firebase(FIREBASEURL);
    var auth =
      new FirebaseSimpleLogin(mongeMadreRef, function(error, user) {
        if (error) {
          // an error occurred while attempting login
          console.log(error);
        } else if (user) {
          var mongeMadreUserRef = new Firebase(FIREBASEURL+'/'+user.id);
          mongeMadreUserRef.set(user);
          FBUSERID.id = user.id;
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
      },
      getPictureURL: function (userId,height,width) {
        var deferred = $q.defer();
        FB.api('/'+userId+'/picture?height='+height+'&width='+width+'',function(imageUrl){
          if (imageUrl && !imageUrl.error) {
            deferred.resolve(imageUrl);
          }else{
            deferred.reject(imageUrl.error);
          }
        });
        return deferred.promise;
      },
      compartirMadreMonge: function(){
        FB.ui({
          method: 'feed',
          link: 'https://www.google.com/?gws_rd=ssl',
          caption: 'An example caption'
        }, function(response){
          console.log('!!!!');
          console.log(response);
        });
      }
    };
  });
