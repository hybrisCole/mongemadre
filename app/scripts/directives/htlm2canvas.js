'use strict';

angular.module('mongemadreApp')
  .directive('htlm2canvas', function () {
    return {
      templateUrl : 'views/cedula.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.imageShow = true;

        html2canvas(element, {
  			   onrendered: function(canvas) {
            scope.imageURL = canvas.toDataURL();
            scope.imageShow = false;
            console.log(scope.imageURL);
  			  }
		    });
      }
    };
  });
