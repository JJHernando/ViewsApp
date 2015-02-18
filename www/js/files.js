angular.module("starter.files", [])

.service('fileUpload', ['$http', function ($http) {
    /**
     *
     * @param file fichero a subir obtenido en el controlador
     * @param uploadUrl URL de tratamiento del fichero de resources.config
     * @param additionalData Objeto JSON con attributos del formulario (el objeto a guardar adicionalmente)
     */
    this.uploadFileToUrl = function(file, uploadUrl, additionalData){
        //genero
        var fd = new FormData();
        fd.append('file', file);
        if (additionalData!=null){
            for (var key in additionalData) {
                if (additionalData.hasOwnProperty(key)) {
                    fd.append(key,additionalData[key]);
                }
            }
        }
        //Realizo un post a la url definida. Pendiente realización callbacks para subida correcta
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}, /* ASOTO it makes browser detect type of content type and set by the server to multipart*/
        })
            .success(function(){
                console.log("Upload OK");
            })
            .error(function(data, status, headers, config){
                console.log("Upload ERROR");
            });
    }
}])

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])

;
