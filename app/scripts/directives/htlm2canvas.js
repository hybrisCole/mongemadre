'use strict';

angular.module('mongemadreApp')
  .directive('htlm2canvas', function ($timeout,facebookService) {
    return {
      templateUrl: 'views/cedula.html',
      restrict: 'E',
      link: function (scope){
        scope.imageShow = true;
        //var putin = angular.element(element[0].childNodes[2]);
        scope.imageUrl = '';

        AWS.config.update({
          accessKeyId     : 'AKIAIWOR3KNGZBKQJ3CA', 
          secretAccessKey : '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'
        });

        var bucket  = new AWS.S3({params: {Bucket:'blaksun'}});
            
        facebookService.getPictureURL(300,300).then(function(pictureObj){
          scope.imageUrl = pictureObj.data.url;

          var c=document.getElementById('myCanvas');
          var ctx=c.getContext('2d');
          var imageObj1 = new Image();
          var imageObj2 = new Image();
          imageObj1.src = pictureObj.data.url;
          imageObj2.src = '../images/a.png';
          imageObj1.onload = function() {
            ctx.drawImage(imageObj1, 0, 0, 180, 180);
            imageObj2.onload = function() {
              ctx.drawImage(imageObj2, 15, 85, 180, 180);
              var img = c.toDataURL('image/png');
              document.body.appendChild('<img src="' + img + '" width="328" height="526"/>');
            };
          };
          
          var params = {
            Key         : scope.imgName+'.png', 
            ContentType : 'image/png', 
            Body        : dataURItoBlob(c.toDataURL('image/png'))
          };

          bucket.putObject(params, function(err, data){
            if(err){
              console.log(err, err.stack);
            }else{
              console.log(data);
            }
          });
        },function(error){
        console.log(error);
      });
        
        //convert dataURI into a file https://developer.mozilla.org/en-US/docs/Web/API/Blob
        function dataURItoBlob(dataURI){
           var byteString, mimestring;
          if(dataURI.split(',')[0].indexOf('base64') !== -1){
            byteString = atob(dataURI.split(',')[1]);
          }else{
            byteString = decodeURI(dataURI.split(',')[1]);
          }
          mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];
          
          var content = [];
          for (var i = 0; i < byteString.length; i++) {
            content[i] = byteString.charCodeAt(i);
          }
          return new Blob([new Uint8Array(content)], {type: mimestring});
        }

        /*function convertImgToBase64(url, callback, outputFormat){
          var canvas = document.createElement('CANVAS'),
              ctx = canvas.getContext('2d'),
              img = new Image();
              img.crossOrigin = 'Anonymous';
          img.onload = function(){
            var dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback.call(this, dataURL);
           canvas = null; 
          };
          img.src = url;
        }*/
      }
    };
  });
