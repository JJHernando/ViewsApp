'use strict';
var countryController = angular.module('starter.country', []);

countryController.controller('CountryListCtrl', function($location, $scope, Country) {
    Country.query(function (data) {
        $scope.countries = data;
        console.log($scope.countries);
    });
    $scope.insert = function (currentCountry) {
        console.log("llega ok." + currentCountry.code);
        Country.add({}, currentCountry);
        $location.path('/countries');
    };
    $scope.remove = function (currentCountry) {
        Country.remove({id: id}, {}, function (data) {
            $location.path('/');
        });
    };

});
countryController.controller('CountryDetailCtrl', ['$location', '$scope', '$stateParams', 'Country'
    , function ($location, $scope, $stateParams, Country) {
        $scope.country = Country.get({id: $stateParams.id}, function (country) {
            //$scope.mainImageUrl = phone.images[0];
            console.log("carga ok");
        });
        $scope.update = function (currentCountry) {
            Country.update({id: $scope.country.code}, currentCountry, function (data) {
                $location.path('/');
            });
        };
    }]);


