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
    // Public API here
    return {
      login: function () {
        var deferred = $q.defer();
        FB.login(function(response) {
          deferred.resolve(response);
          FBUSERID = {
            id:response.authResponse.userID,
            accessToken:response.authResponse.accesToken
          };
          FB.api('/me',function(responseMe){
            var mongeMadreUserRef = new Firebase(FIREBASEURL+'/'+response.authResponse.userID);
            mongeMadreUserRef.set(responseMe);
          });
        }, {scope: 'email,public_profile,user_friends,publish_actions,publish_stream'});
        return deferred.promise;
        /*auth.login('facebook',{
          rememberMe: true,
          scope: 'email,public_profile,user_friends,publish_stream,publish_actions',
          accessToken:FBUSERID.accessToken
        });*/
      },
      logout:function (){
        //auth.logout();
      },
      getPictureURL: function (height,width){
        var deferred = $q.defer();
        console.log(FBUSERID.id);
        FB.api('/'+FBUSERID.id+'/picture?height='+height+'&width='+width+'',function(imageUrl){
          if (imageUrl && !imageUrl.error) {
            console.log(imageUrl);
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
          var data = snapshot.val(),
            nombreMamaPrimero = data.first_name + ' ' + data.last_name.split(' ').reverse().join().replace(',',' '),
            mensaje = nombreMamaPrimero + ' cambió sus apellidos, porque #MamáVaPrimero, hacelo vos también!';
          FB.api(
            '/me/feed',
            'POST',
            {
              'message': mensaje,
              'link':'https://www.facebook.com/amatistadigitalcr/app_1441805799429811'
            },
            function (response) {
              console.log(response);
              if (response && !response.error) {

              }
            }
          );
        });
      }
    };
  });
