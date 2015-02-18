      angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state, $stateParams) {
  $scope.signIn = function(user) {
    /*deberia conectar con BDD y validar al usuario y entonces hacer el $state.go y pasarle el parametro*/
    $state.go('app.home', {usuario: user.name});
  };
})

.controller('MenuCtrl', function($scope, $ionicActionSheet, $state, $stateParams) {
   $scope.signOut = function() {
        /*vacio al usuario para poder entar con otro  y salgo de nuevo  a signin */
        $scope.user = [];
        $state.go('signin');
    };
    $scope.usuario =  $stateParams.usuario;
})

.controller('HomeCtrl', function($location, $scope, $stateParams) {

      /*demomento no hace nada*/
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
  }).then(function(popover) {;
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
      Items.query({category_id: $stateParams.id}, function (items) {
        console.log($stateParams);
          $scope.Items = [];
          if ($stateParams.category_id == 'all'){
            $scope.Items = items;
          }
          for(x=0; x<items.length; x++) {
               if (items[x].category_id == $stateParams.category_id ){
                  $scope.Items.push(items[x]);
               }
          }
      });
})

.controller('ImagenesCtrl', function($location, $scope, $stateParams, Imagenes) {
    var imagenes = Imagenes.query({item_id: $stateParams.item_id}, function (imagenes) {
          console.log($stateParams);
          $scope.category_id = $stateParams.category_id;
          $scope.Imagenes = [];
          for(x=0; x<imagenes.length; x++) {
               if (imagenes[x].item_id == $stateParams.item_id ){
                  $scope.Imagenes.push(imagenes[x]);
               }
          }
      });
     $scope.insert = function (currentCategory) {
        Imagenes.add({}, currentCategory);
        $location.path('/categories');
    };
})

.controller('EditCtrl', function($location, $scope, $state, $stateParams, Items, Imagenes, Category ) {

      $scope.makeImage = function() {
          var options = {
              quality : 75,
              destinationType : Camera.DestinationType.DATA_URL,
              sourceType : Camera.PictureSourceType.CAMERA,
              allowEdit : true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 320,
              targetHeight: 360,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.imgURI = "data:image/jpeg;base64," + imageData;
          }, function(err) {
              // An error occured. Show a message to the user
          });
      }

     $scope.insert_Item = function (current_Item, opcion) {
       if(current_Item == undefined){
              console.log("Sin definir objeto");
        }
        else{
            if(current_Item.name == undefined ){ console.log("Nombre no definido");}
            if(current_Item.description == undefined ){ console.log("Descripcion no definido");}
            if(current_Item.category_id == undefined ){console.log("Categoria no definida"); }

            else{
                /*Items.add({}, current_Item);*/
                Items.query({category_id: $stateParams.id}, function (items) {
                  $scope.ItemAñadido = [];
                    var x = items.length -1;
                    $scope.ItemAñadido.push(items[x]);
                 if (opcion == 'Just_Item'){
                    $state.go('app.home', {usuario: $stateParams.usuario });
                }
                if (opcion == 'Image'){
                   $state.go('app.new-Imagen', {id: $scope.ItemAñadido[0].id , usuario: $stateParams.usuario});
                }
                });
            }
        }
      };

     $scope.insert_Image = function (current_Image) {
      if(current_Image == undefined){
          console.log("Sin definir objeto");
      }
      else{
          if(current_Image.name == undefined ){ console.log("Nombre no definido");}
          if(current_Image.label == undefined ){ console.log("Label no definido");}
          else{
            current_Image.item_id = $stateParams.id
            $scope.ImagenAñadida = [];
            $scope.ImagenAñadida.push(current_Image);
            Imagenes.add({}, current_Image);
            $state.go('app.home', {usuario: $stateParams.usuario });
          }
      }
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