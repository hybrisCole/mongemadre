'use strict';

angular.module('mongemadreApp')
  .directive('htlm2canvas', function ($cookieStore, $timeout, mailer) {
    return {
      templateUrl: 'views/cedula.html',
      restrict: 'E',
      link: function (scope, element){
        scope.imageShow = true;
        //scope.imageURL  = '';
        var putin = angular.element(element[0].childNodes[0]);
        $timeout(function() {
            html2canvas(putin,{
              onrendered: function(canvas){
              //$cookieStore.put('imageURl',canvas.toDataURL());
              document.body.appendChild(canvas);
              //angular.element(element[0].childNodes[0]).apend(canvas);
              console.log(canvas.toDataURL('image/png'));
              //mailer.submitForm(canvas.toDataURL('image/png'));
              localStorage.clickcount = canvas.toDataURL('image/png');
            }
          });
        }, 0);

        scope.sendme = function(){
          console.log(localStorage.clickcount);
          mailer.submitForm(localStorage.clickcount);
        }


        //scope.imageURL  = localStorage.clickcount;
        //console.log(scope.imageURL);
      }
    };
  });
