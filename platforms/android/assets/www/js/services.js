angular.module('starter.services', [])

.factory('Country',['$http'  ,function ($http) {
    return {
        query: function(){
        return $http.get("http://www.planificaciondeportiva.es/bmoll-app/api/web/v1/countries/:id");
        }
    };
}]);
    /*
    return $resource("http://www.planificaciondeportiva.es/bmoll-app/api/web/v1/countries/:id"), {
            query: {method: 'GET', isArray: true}
           }
    });
    */