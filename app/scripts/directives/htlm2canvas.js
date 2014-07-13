'use strict';

angular.module('mongemadreApp')
  .directive('htlm2canvas', function ($cookieStore) {
    return {
      templateUrl: 'views/cedula.html',
      restrict: 'E',
      link: function (scope, element){
        scope.imageShow = true;
        scope.imageURL  = '';
        html2canvas(element,{
  			   onrendered: function(canvas){
            $cookieStore.put('imageURl',canvas.toDataURL());
  			  }
		    });
      }
    };
  });
