'use strict';

/**
 * @ngdoc service
 * @name mongemadreApp.FBUSERID
 * @description
 * # FBUSERID
 * Value in the mongemadreApp.
 */
angular.module('mongemadreApp')
  .value('FBUSERID', {id:-1,accessToken:'-1',set:function(id,accessToken){
    this.accessToken = accessToken;
    this.id = id;
  }});
