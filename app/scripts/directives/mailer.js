'use strict';
/* jshint camelcase: false*/
angular.module('mongemadreApp')
  .factory('mailer', function($http,$q){
    return {
      submitForm : function(img){
      	  console.log(img);
          var defer = $q.defer();
          $http({
            method: 'POST',
            url: 'https://mandrillapp.com/api/1.0/messages/send.json',
            data: {
              key: 'bgQ7dsSPRIz4Mrd_NOQ5xA',
              message: {
                from_email: 'carloz@ramirez.com',
                to: [{
                  email: 'abdeldw@gmail.com',
                  name: 'Abdel Atencio',
                  type: 'to'
                }],
                autotext: 'true',
                subject: 'Emergencia Rover',
                html: '<p>mailer</p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtoAAAASCAYAAABlynnDAAAFQElEQVR4Xu2de8ieYxzH37GcQlhEObzkuIVSog29jI0x58MiOU0YLaeQ+UNyGE2TsGL7g5HzMdIiicxpyxLRhAnR/nCOZobvp66r7u528Naee+v1uevTdd/P89z3db+f5/3j+1z9ruse1uemAQ1oQAMa0IAGNKABDax1A8PW+hW9oAY0oAENaEADGtCABjTQ13XQ3iHOv+vA+5bpY4vwbaOv3bL/dVjeQf92oQENaEADGtCABjTwPzfQVdA+O54fCm+Gw8OKHnt/PNc/JuwSTg6zw6/l+Mce9+3lNaABDWhAAxrQgAY00NmI9vASdrdJe2L4u8fux+X6+4W7wl/h/HBb2DsYtHss38trQAMa0IAGNKABDfR1ErQ3KMF6etqRHQXt9nd7Wl64x6Dtv7wGNKABDWhAAxrQQFcGaunIpHR4ZVgaRgTKLn4K24ZZ4ZTwfrg8zA8HhBPCnuH58Gg59+i0H5Sb3yzt3eH08EfYLjwWzgrtEe0d89r4cFB4KswNm5Y+vko7JwyE68Pt5fyj0j5c+hudlpKUhYE6cK5zSzgkMIJt0C5fio0GNKABDWhAAxrQQDcGCNrbByYoElAJ2s8ESi0ouSA0nxneC/eGSwLlFwTwpwPhmZFiaqIfDB8HSkMYxX49EMqvC4R3jj8v77eD9sS8Th0113si3BEo9SBMc08nhbHhpnBg+CZwz7z2Wrg4XBFGhYMDPxrGhFoqYtCODDcNaEADGtCABjSgge4MELQJo58EJiwyQkxY/T4cHyj3IHSzUgej3IxoXx3uDIxW9wdCMJMbm6Uhh+aYwNysia6fX1WNNu+zMgjvE/JrON43+4TtrcMPgaBNYF9Q7mlx2gvCrY3+GG2/v3Fs0I4MNw1oQAMa0IAGNKCB7gwQtDcJ7wYmDzJSPCF8FBhhZok82o3CsvBPIOR+GdrBmTA7JTDKfE24MOwffit/zn8J2v35bA3iA9lnpLyGde6T0pBzAiGb7YjwQCCgc+/8DSsrFTFoF2E2GtCABjSgAQ1oQAPdGKg12gTqm8PU0u1haanb3ikwOkzArtuG2WEEe1VB+8i8R001gZvR8V/KiYMN2rvmvHdCM2hTmnJGWBSeC1sFyktYZWR1I9gG7W7+n+xFAxrQgAY0oAENaKAYIGgThgmsbwUmEb4QGEn+PVwbGJX+sHye8g0mPh4bZob+UEtHmiPaF+X1+1rn1qDdDu71y2gHcUpGXg3tEW0mU7I+NkF758BDaJisSX97BIJ9O1gbtKtlWw1oQAMa0IAGNKCBTgzUGm1Gg+uDZAjSjByzmggBmwe9UAPNKiTUcBNa3wiMWjMpsgZnarR5b59AAP4sUM7BiPOf4ZWweSAoM4GxPSFyZSPk9LFXYOIjIf/TcG65DjXgl4W3w5PltfPSsjrKQGCSZg3eTOjkh0E9zq6bBjSgAQ1oQAMa0IAGemeAoL17IBQTfnlkOWH01LJPvfSzje6Py/5LgVpsViFhuzQQwh8pxzemZXUQAva81q2zMgnXezE0nw45OcfUWrNNC6xywvVYhYTykavCDYEJmQR/6rQpdWFd7pcDT53kB8IXYUZgdJuN0M3qKPwIYOOz3PuScmyjAQ1oQAMa0IAGNKCBnhhoPoJ94/TAhMOfWz2xnjVrYvM6q4EMZmMSJedzbq3tHsz5a/os90WJCxv3z4RNNw1oQAMa0IAGNKABDaxzA82gvc5vxhvQgAY0oAENaEADGtDAUDFg0B4q36R/hwY0oAENaEADGtDAemXAoL1efR3ejAY0oAENaEADGtDAUDHwLzmQ+xNmQcVyAAAAAElFTkSuQmCC"/>'
              }
            }
          }).success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
      }
    };
  });