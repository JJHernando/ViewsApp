angular.module('starter.categories', [])

.factory('Category', function (RESOURCES, $resource) {
    //return $resource("http://www.planificaciondeportiva.es/bmoll-app/api/web/v1/categories/:id");
    return $resource(RESOURCES.CATEGORIES + "/:id", null, {
            query: {method: 'GET', isArray: true},
            get: {method: 'GET'},
            add: {method: 'POST'},
            delete: {method: 'DELETE'},
            update: {method: 'PUT'} ,
            params:{id:'@code'}
        });
})

.factory('Items', function (RESOURCES, $resource) {
    //return $resource("http://www.planificaciondeportiva.es/bmoll-app/api/web/v1/categories/:id");
    return $resource(RESOURCES.ITEMS + "/:category_id", null, {
            query: {method: 'GET', isArray: true},
            get: {method: 'GET'},
            add: {method: 'POST'},
            delete: {method: 'DELETE'},
            update: {method: 'PUT'} ,
            params:{id:'@code'}
        });
})

.factory('Imagenes', function (RESOURCES, $resource) {
    //return $resource("http://www.planificaciondeportiva.es/bmoll-app/api/web/v1/categories/:id");
    return $resource(RESOURCES.IMAGENES + "/:items_id", null, {
            query: {method: 'GET', isArray: true},
            get: {method: 'GET'},
            add: {method: 'POST'},
            delete: {method: 'DELETE'},
            update: {method: 'PUT'} ,
            params:{id:'@code'}
        });
})

;
