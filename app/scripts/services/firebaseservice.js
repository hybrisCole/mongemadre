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
      getUsuario: function () {
        /* jshint camelcase: false*/
        var deferred = $q.defer();
        var mongeMadreUserRef = new Firebase(FIREBASEURL+'/'+FBUSERID.id);
        mongeMadreUserRef.on('value', function(snapshot) {
          var data = snapshot.val(),
            apellidos = data.last_name.split(' ');
          if(_.isUndefined(apellidos[1])){
            apellidos[1] = '';
          }
          deferred.resolve({
            cedula:'',
            nombre:data.first_name,
            primerApellido:apellidos[0],
            segundoApellido:apellidos[1],
            correoElectronico:data.email
          });
        });
        return deferred.promise;
      }
    };
  });
