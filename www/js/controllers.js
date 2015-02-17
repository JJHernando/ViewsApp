angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state, $stateParams) {
  $scope.signIn = function(user) {
    $state.go('app.home', {usuario: user.name});
  };
})

.controller('MenuCtrl', function($scope, $ionicActionSheet, $state, $stateParams) {

   $scope.signOut = function() {
        $scope.user = [];
        $state.go('signin');
  };

  $scope.usuario =  $stateParams.usuario;

})

.controller('HomeCtrl', function($location, $scope, $stateParams) {

})


.controller("CameraCtrl", function($scope, $cordovaCamera) {

    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

})

.controller('ButFloatCtrl', function($location, $scope, $stateParams, $ionicPopover) {

  // .fromTemplate() method
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope,
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('botones_list.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

})

.controller('CategoryCtrl', function($location, $scope, Category) {
    Category.query(function (data) {
        $scope.categories = data;
        console.log($scope.categories);
    });
    $scope.insert = function (currentCategory) {
        Category.add({}, currentCategory);
        $location.path('/categories');
    };
    $scope.remove = function (currentCategory) {
        Category.remove({id: id}, {}, function (data) {
            $location.path('/');
        });
    };
})


.controller('ItemsCtrl', function($location, $scope, $state, $stateParams, Items, Imagenes ) {

    var items = Items.query({category_id: $stateParams.id}, function (data) {
          $scope.It = $stateParams.category_id;
          $scope.Items = [];
          console.log($scope.It);
          if ($scope.It == 'all'){
            $scope.Items = items;
          }
          for(x=0; x<items.length; x++) {
               if (items[x].category_id == $stateParams.category_id ){
                  $scope.Items.push(items[x]);
               }
          }
    });
     $scope.insert = function (currentCategory, currentImagen) {
      console.log("entor aqui con :");
      console.log(currentCategory);
      console.log(currentImagen);


    };
    $scope.remove = function (currentCategory) {
        Items.remove({id: id}, {}, function (data) {
            $location.path('/');
        });
    };
})


.controller('ImagenesCtrl', function($location, $scope, $stateParams, Imagenes) {
    var imagenes = Imagenes.query({item_id: $stateParams.item_id}, function (imagenes) {
          $scope.category_id = $stateParams.category_id;
          $scope.Imagenes = [];
          console.log($scope.category_id);
          for(x=0; x<imagenes.length; x++) {
                /* $scope.Imagenes.push(imagenes[x]);*/
               if (imagenes[x].item_id == $stateParams.item_id ){
                  $scope.Imagenes.push(imagenes[x]);
               }
          }
      });
     $scope.insert = function (currentCategory) {
        Imagenes.add({}, currentCategory);
        $location.path('/categories');
    };
    $scope.remove = function (currentCategory) {
        Imagenes.remove({id: id}, {}, function (data) {
            $location.path('/');
        });
    };
})

.controller('ItemImageCreationCtrl', [ '$scope', '$modalInstance', 'Items','Imagenes','fileUpload','RESOURCES',
        function($scope, $modalInstance, Items,Imagenes, fileUpload,RESOURCES) {
            $scope.selected = {
                //item: $scope.Items[0]
            };
            $scope.ok = function (image) {  //IMAGE is var sent with button associated to scope
                var file = $scope.myFile; //name supported by new directive
                var uploadUrl = RESOURCES.IMAGES; //config URL
                console.log('file is ' + JSON.stringify(file) + "  @"+uploadUrl);
                fileUpload.uploadFileToUrl(file, uploadUrl,image);
                /* VIA REST DIRECTLY DOES NOT WORK
                Imagenes.add(image);
                */
                $modalInstance.close($scope.selected.item); //just closing my dialog
            };
            $scope.cancel = function () {
                $modalInstance.dismiss("cancel");
            };
        }]
);
;