'use strict';

angular.module('mongemadreApp')
  .directive('htlm2canvas', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the htlm2canvas directive');
      }
    };
  });
