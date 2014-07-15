'use strict';

/**
 * @ngdoc service
 * @name mongemadreApp.facebookService
 * @description
 * # facebookService
 * Factory in the mongemadreApp.
 */
angular.module('mongemadreApp')
  .factory('facebookService', function ($q, $location,firebaseService,FIREBASEURL,FBUSERID,FBAPPID) {
    // Public API here

    var facebookLogin = function(userId,accessToken){
      var deferred = $q.defer();
      FBUSERID.set(userId,accessToken);
      FB.api('/me',function(responseMe){
        if (responseMe && !responseMe.error) {
          firebaseService.getUsuario().then(function(usuario){
            //si no tiene cedula, es porque no se ha registrado,
            // solo en ese caso se guarda
            if(usuario.cedula===''){
              var mongeMadreUserRef = new Firebase(FIREBASEURL+'/'+userId);
              mongeMadreUserRef.set(responseMe);
            }
            deferred.resolve(responseMe);
          });
        }else{
          deferred.reject(responseMe);
        }
      });
      return deferred.promise;
    };
    return {
      login: function () {
        var deferred = $q.defer();
        FB.login(function(response) {
          if (response && !response.error) {
            FBUSERID.set(response.authResponse.userID,response.authResponse.accesToken);
            FB.api('/me',function(responseMe){
              if (responseMe && !responseMe.error) {
                firebaseService.getUsuario().then(function(usuario){
                  //si no tiene cedula, es porque no se ha registrado,
                  // solo en ese caso se guarda
                  if(usuario.cedula===''){
                    var mongeMadreUserRef = new Firebase(FIREBASEURL+'/'+response.authResponse.userID);
                    mongeMadreUserRef.set(responseMe);
                  }
                  deferred.resolve(responseMe);
                });
              }else{
                deferred.reject(response);
              }
            });
          }else{
            deferred.reject(response);
          }
        }, {scope: 'email,public_profile,user_friends,publish_actions,publish_stream'});
        return deferred.promise;
      },
      logout:function (){
        var deferred = $q.defer();
        FB.getLoginStatus(function(response) {
          if (response && response.status === 'connected') {
            FB.logout(function(response) {
              if (response && !response.error) {
                deferred.resolve(response);
                document.location.reload();
              }else{
                deferred.reject(response);
              }
            });
          }
        });

        return deferred.promise;
      },
      getPictureURL: function (height,width){
        var deferred = $q.defer();
        FB.api('/'+FBUSERID.id+'/picture?height='+height+'&width='+width+'&type=small',function(imageUrl){
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
        firebaseService.getUsuario().then(function(usuario){
          var nombreMamaPrimero =
            usuario.nombre + ' ' +
              usuario.segundoApellido + ' ' +
              usuario.primerApellido + ' ' ,

            mensaje = nombreMamaPrimero + ' cambió sus apellidos, porque #MamáVaPrimero, hacelo vos también!';

          FB.api(
            '/me/feed',
            'POST',
            {
              'message': mensaje,
              'link':'https://www.facebook.com/amatistadigitalcr/app_1441805799429811'
            },
            function (response) {
              if (response && !response.error) {
                console.log(response);
              }
            }
          );

        });
      },
      init: function(){
        var deferred = $q.defer(),
          loginDetectedFunction = function(response){
          if(response.status === 'connected'){
            facebookLogin(
              response.authResponse.userID,
              response.authResponse.accessToken
            ).then(function(){
                deferred.resolve();
                $location.path('/formularioRegistro');
            });
          } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
          } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
          }
        };

        FB.init({
          appId: FBAPPID,
          version    : 'v2.0',
          cookie: true,
          xfbml: true
        });
        FB.Event.subscribe('auth.statusChange', function(response) {
          loginDetectedFunction(response);
        });

        FB.getLoginStatus(function(response) {
          loginDetectedFunction(response);
        });
        return deferred.promise;
      },
      postFoto: function(){
        FB.api(
          "/me/photos",
          "POST",
          {
            url: 'https://imagemerge.nodejitsu.com/canvasMonge/https%3A%2F%2Ffbcdn-profile-a.akamaihd.net%2Fhprofile-ak-frc3%2Ft1.0-1%2Fc42.42.528.528%2Fs200x200%2F1174931_10151895632505739_659447658_n.jpg',
            message: 'A test message'
          },
          function (response) {
            console.log(response);
            if (response && !response.error) {
              /* handle the result */
            }
          }
        );
      }
    };
  });
