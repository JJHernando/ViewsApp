// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.config', 'starter.categories', 'starter.files', 'ngResource', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant('$ionicLoadingConfig', {
  template: 'Default Loading Template...'
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
  })

  .state('app.home', {
    url: "/home/:usuario",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
      }
    }
  })

  .state('app.categories', {
    url: "/categories",
    views: {
      'menuContent': {
        templateUrl: "templates/categories.html"
      }
    }
  })

  .state('app.category', {
    url: "/category/:category_id",
    views: {
      'menuContent': {
        templateUrl: "templates/category.html",
      }
    }
  })

   .state('app.imagen', {
    url: "/imagen/:item_id/:category_id",
    views: {
      'menuContent': {
        templateUrl: "templates/imagen.html",
      }
    }
  })

    .state('app.new-Item', {
      url: "/new-Item/:usuario",
      views: {
        'menuContent': {
          templateUrl: "templates/new-Item.html",
        }
      }
    })
    .state('app.new-Imagen', {
      url: "/new-Imagen/:id/:usuario",
      views: {
        'menuContent': {
          templateUrl: "templates/new-Imagen.html",
        }
      }
    })
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sign-in');

})
;
