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
          var data = snapshot.val() || {};
          data.last_name = data.last_name || '';
          var apellidos = data.last_name.split(' ');
          deferred.resolve({
            cedula:data.cedula || '',
            nombre:data.nombre || data.first_name || '',
            primerApellido:data.primerApellido || apellidos[0],
            segundoApellido:data.segundoApellido || apellidos[1] || '',
            correoElectronico:data.correoElecronico || data.email || ''
          });
        });
        return deferred.promise;
      },
      actualizarUsuario:function(usuario){
        var mongeMadreUserRef = new Firebase(FIREBASEURL+'/'+FBUSERID.id);
        mongeMadreUserRef.on('value', function(snapshot) {
          var data = snapshot.val();
          data.cedula = usuario.cedula;
          data.nombre = usuario.nombre;
          data.primerApellido = usuario.primerApellido;
          data.segundoApellido = usuario.segundoApellido;
          data.correoElectronico = usuario.correoElectronico;
          mongeMadreUserRef.update(data);
        });
      }
    };
  });
