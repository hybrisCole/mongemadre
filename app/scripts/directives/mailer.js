'use strict';
/* jshint camelcase: false*/
angular.module('mongemadreApp')
  .factory('mailer', function($http,$q){
    return {
      submitForm : function(info){
          var nombre = info.nombre + info.primerApellido;
          var urlImg = 'https://imagemerge.nodejitsu.com/cedulaMonge/https%3A%2F%2Ffbcdn-profile-a.akamaihd.net%2Fhprofile-ak-frc3%2Ft1.0-1%2Fc42.42.528.528%2Fs200x200%2F1174931_10151895632505739_659447658_n.jpg/'+info.nombre+'/'+info.primerApellido+'/'+info.segundoApellido+'/'+info.cedula;
          var defer = $q.defer();
          $http({
            method: 'POST',
            url: 'https://mandrillapp.com/api/1.0/messages/send.json',
            data: {
              key: 'bgQ7dsSPRIz4Mrd_NOQ5xA',
              message: {
                from_email: 'noreply@monge.com',
                to: [{
                  email: 'abdeldw@gmail.com',
                    name: nombre,
                  type: 'to'
                },
                {
                  email: info.correoElectronico,
                  name: nombre,
                  type: 'to'
                }],
                autotext: 'true',
                subject: 'Promoción Monge Dia de la madre',
                html: '<p>'+nombre+'</p><br><p>Muchas gracias por participar en la promocion: #mamáVaPrimero de Monge.</p><br><p>Te adjuntamos tu cédula:</p><br><img src="'+urlImg+'" alt="" />'
              }
            }
          }).success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
      }
    };
  });