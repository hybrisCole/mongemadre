'use strict';

/**
 * @ngdoc service
 * @name mongemadreApp.pictureService
 * @description
 * # pictureService
 * Factory in the mongemadreApp.
 */
angular.module('mongemadreApp')
  .factory('pictureService', function ($q) {

    return {
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
      }
    };
  });
