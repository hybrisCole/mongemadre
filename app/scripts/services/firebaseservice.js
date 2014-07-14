'use strict';

/**
 * @ngdoc service
 * @name mongemadreApp.firebaseService
 * @description
 * # firebaseService
 * Factory in the mongemadreApp.
 */
angular.module('mongemadreApp')
  .factory('firebaseService', function ($q,$location,FBUSERID,FIREBASEURL) {
    if(FBUSERID.id === -1){
      $location.path('/');
    }
    // Public API here
    return {
      /* jshint camelcase: false*/
      getUsuario: function () {
        var deferred = $q.defer();
        var mongeMadreUserRef = new Firebase(FIREBASEURL+'/'+FBUSERID.id);
        mongeMadreUserRef.on('value', function(snapshot) {
          var data = snapshot.val(),
            apellidos = data.last_name.split(' ');
            apellidos = data.last_name.split(' ');
          deferred.resolve({
            cedula:data.cedula || '',
            nombre:data.first_name,
            primerApellido:apellidos[0],
            segundoApellido:data.segundoApellido || apellidos[1] || '',
            correoElectronico:data.email || ''
          });
        });
        return deferred.promise;
      },
      actualizarUsuario:function(usuario){
        console.log('llamando a Actualizar Usuario');
        var mongeMadreUserRef = new Firebase(FIREBASEURL+'/'+FBUSERID.id);
        mongeMadreUserRef.on('value', function(snapshot) {
          var data = snapshot.val();
          data.cedula = usuario.cedula;
          data.segundoApellido = usuario.segundoApellido;
          data.email = usuario.correoElectronico;
          mongeMadreUserRef.update(data);
        });
      }
    };
  });
