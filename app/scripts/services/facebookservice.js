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
          FBUSERID = {
            id:user.id,
            accessToken:user.accessToken
          };
        } else {
          // user is logged out
        }
      });

    // Public API here
    return {
      login: function () {
        console.log(FBUSERID.accessToken);
        /*FB.login(function(response) {
          console.log(response);
        }, {scope: 'email,public_profile,user_friends,publish_actions,publish_stream'});*/
        auth.login('facebook',{
          rememberMe: true,
          scope: 'email,public_profile,user_friends,publish_stream,publish_actions',
          accessToken:FBUSERID.accessToken
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
        /* jshint camelcase: false*/
        var mongeMadreUserRef = new Firebase(FIREBASEURL+'/'+FBUSERID.id);
        mongeMadreUserRef.on('value', function(snapshot) {
          var data = snapshot.val().thirdPartyUserData,
            nombreMamaPrimero = data.first_name + ' ' + data.last_name.split(' ').reverse().join().replace(',',' '),
            mensaje = nombreMamaPrimero + ' cambió sus apellidos, porque #MamáVaPrimero, hacelo vos también!';
          console.log(mensaje);
        });
        FB.api(
            '/me/feed',
          'POST',
          {
            'object': {
              'message': 'This is a test message'
            }
          },
          function (response) {
            console.log(response);
            if (response && !response.error) {

            }
          }
        );
      }
    };
  });
