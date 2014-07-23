'use strict';

/**
 * @ngdoc service
 * @name mongemadreApp.facebookService
 * @description
 * # facebookService
 * Factory in the mongemadreApp.
 */
angular.module('mongemadreApp')
  .factory('facebookService', function ($q, $location,
    firebaseService,FIREBASEURL,FBUSERID,FBAPPID) {
    // Public API here
    var fotoPerfil = '',
        fotoCover = '';
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
      getCoverPictureURL: function(){
        var deferred = $q.defer();
        FB.api('/me',{fields: 'cover'},function(responseMe){
          if (responseMe && !responseMe.error) {
            deferred.resolve(responseMe);
          }else{
            deferred.reject(responseMe);
          }
        });
        return deferred.promise;
      },
      getPictureURL: function (height,width){
        height = height || 300;
        width = width || 300;
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

          var obj = {
            method: 'feed',
            app_id: 1441805799429811,
            link: 'https://www.facebook.com/ImportadoraMonge/app_1441805799429811',
            picture: 'https://s3.amazonaws.com/blaksun/mama.jpg',
            name: mensaje,
            caption: 'https://www.facebook.com/ImportadoraMonge/app_1441805799429811',
            description: 'Promoción Monge día de la madre, participe y gane fabulosos premios.'
          };

          FB.ui(obj, function(response) {
            if (response && !response.error_code) {
          
            } else {
              console.log('Error while posting.');
            }
          });

        });
      },
      init: function(){
        var deferred = $q.defer();

        FB.init({
          appId: FBAPPID,
          version    : 'v2.0',
          cookie: true,
          xfbml: true
        });
        deferred.resolve();
        return deferred.promise;
      },
      postFoto: function(url,pathBackend) {
        pathBackend = pathBackend || 'https://imagemerge.nodejitsu.com/canvasMonge/';
        /* jshint camelcase: false*/
        var deferred = $q.defer();
        FB.api('/me/photos','POST',
          {
            url: pathBackend+url,
            no_story:false
          },
          function (response) {
            if (response && !response.error) {
              deferred.resolve(response);
            }else{
              deferred.reject(response);
            }
          }
        );
        return deferred.promise;
      },
      actualizarFotoPerfil: function(){
        var deferred = $q.defer();
        var that = this;
        that.getPictureURL().then(function(picture){
          var uriEncodedPerfil = encodeURIComponent(picture.data.url);
          that.postFoto(uriEncodedPerfil).then(function(data){
            fotoPerfil = data.id;
            deferred.resolve(data);
          },function(err){
            deferred.reject(err);
          });
        },function(err){
          deferred.reject(err);
        });
        return deferred.promise;
      },
      actualizarFotoCover:function(usuario){
        var deferred = $q.defer(),
          that = this;
        this.getCoverPictureURL().then(function(data){
          var uriEncodedCover = encodeURIComponent(data.cover.source)+'/'+usuario.nombre+'/'+usuario.primerApellido+'/'+usuario.segundoApellido;
          that.postFoto(uriEncodedCover,'https://imagemerge.nodejitsu.com/canvasMongeCover/').then(function(data){
              fotoCover = data.id;
              deferred.resolve(data);
          },function(error){
            deferred.reject(error);
          });
        },function(err){
          deferred.reject(err);
        });
        return deferred.promise;
      },
      getFotoPerfilMonge: function(){
        return fotoPerfil;
      },
      getFotoCoverMonge: function(){
        return fotoCover;
      }
    };
  });
