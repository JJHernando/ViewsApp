var starter = angular.module('starter.countries', []);
starter.factory('Country', function (RESOURCES, $resource) {
    //return $resource("http://www.planificaciondeportiva.es/bmoll-app/api/web/v1/categories/:id");
    return $resource(RESOURCES.CATEGORIES + "/:id", null,
        {
            query: {method: 'GET', isArray: true},
            get: {method: 'GET'},
            add: {method: 'POST'},
            delete: {method: 'DELETE'},
            update: {method: 'PUT'} ,params:{id:'@code'}
        });
});

