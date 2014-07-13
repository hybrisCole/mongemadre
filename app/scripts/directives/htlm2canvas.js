'use strict';

angular.module('mongemadreApp')
  .directive('htlm2canvas', function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log(attrs);
        html2canvas(element, {
  			onrendered: function(canvas) {
  				console.log(canvas);
    			document.body.appendChild(canvas);
  			}
		});
      }
    };
  });
