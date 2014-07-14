'use strict';

angular.module('mongemadreApp')
  .directive('htlm2canvas', function ($timeout,facebookService) {
    return {
      templateUrl: 'views/cedula.html',
      restrict: 'E',
      link: function (scope, element){
        scope.imageShow = true;
        var putin = angular.element(element[0].childNodes[2]);
        scope.imageUrl = '';

        AWS.config.update({
          accessKeyId     : 'AKIAIWOR3KNGZBKQJ3CA', 
          secretAccessKey : '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'
        });

        var bucket  = new AWS.S3({params: {Bucket:'blaksun'}});
        
        facebookService.login().then(function(data){
          if(data.status === 'connected'){
            facebookService.getPictureURL(300,300).then(function(pictureObj){
              //scope.imageUrl = pictureObj.data.url;

              convertImgToBase64(pictureObj.data.url, function(base64Img){
                scope.imageUrl = base64Img;
                console.log(scope.imageUrl);

                element[0].childNodes[2].childNodes[1].src = base64Img;
              });

              html2canvas(putin,{
                onrendered: function(canvas){

                  console.log(canvas);
                  var params = {
                    Key         : scope.imgName+'.png', 
                    ContentType : 'image/png', 
                    Body        : dataURItoBlob(canvas.toDataURL('image/png'))
                  };

                  bucket.putObject(params, function(err, data) {
                    if(err){
                      console.log(err, err.stack);
                    }else{
                      console.log(data);
                    }
                  });
                },
                logging: true,
                allowTaint: true,
                useCORS : true,
                proxy : 'proxy.php'
              });
            },function(error){
              console.log(error);
            });
          }
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

        function convertImgToBase64(url, callback, outputFormat){
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
}
      }
    };
  });
