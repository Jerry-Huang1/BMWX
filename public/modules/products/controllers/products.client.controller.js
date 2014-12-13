'use strict';

// Products controller

angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories',
    function ($scope, $stateParams, $location, Authentication, Products, Categories ) {
        $scope.authentication = Authentication;
        
//        $scope.uploadFile = function(files) {
//            var fd = new FormData();
//            //Take the first selected file
//            fd.append("file", files[0]);
//
//    $http.post(uploadUrl, fd, {
//        withCredentials: true,
//        headers: {'Content-Type': undefined },
//        transformRequest: angular.identity
//    }).success( ...all right!... ).error( ..damn!... );
//
//};
  //       $upload.upload({
//                url: '/serverRouteUrl', //upload.php script, node.js route, or servlet url
//                method: 'POST', //Post or Put
//                headers: {'Content-Type': 'multipart/form-data'},
//                //withCredentials: true,
//                data: JsonObject, //from data to send along with the file
//                file: blob, // or list of files ($files) for html5 only
//                //fileName: 'photo' // to modify the name of the file(s)                
//            }).success(function (response, status) {
//                   //success 
//                }
//            ).error(function (err) {
//                   //error
               
    //        });
        
        //should using angular.each and _underscore
        $scope.categories = Categories.query();
        $scope.selectedCategories = [];
        $scope.selectedIndex = 0;
        $scope.make = function (indx)
        {
            if ($scope.inArray($scope.selectedCategories, $scope.categories[indx]))
                return true;
        };
        $scope.select = function (item, indx) {

            $scope.selectedIndex = indx;
            if ($scope.selectedCategories.length > 0) {

                if (!$scope.inArray($scope.selectedCategories, item)) {
                    $scope.selectedCategories.push(item);
                }
                else
                {
                    $scope.selectedCategories.splice($scope.selectedCategories.indexOf(item), 1);
                }
            }
            else {
                $scope.selectedCategories.push(item);
            }
        };

        $scope.inArray = function (items, item) {
            var exist = false;
            for (var i = 0; i < items.length; i++) {
                if (items[i] === item) {
                    exist = true;
                    break;
                }
            }
            return exist;
        };

        $scope.create = function () {
            // Create new Product object
            var product = new Products({
                name: this.name,
                description: this.description,
                price: this.price,
                quantity: this.quantity,
                sku: this.sku,
                image_url: this.image_url,
                category_id_collection: this.category_id_collection

            });

            // Redirect after savef
            product.$save(function (response) {
                $location.path('products/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Product
        $scope.remove = function (product) {
            if (product) {
                product.$remove();

                for (var i in $scope.products) {
                    if ($scope.products [i] === product) {
                        $scope.products.splice(i, 1);
                    }
                }
            } else {
                $scope.product.$remove(function () {
                    $location.path('products');
                });
            }
        };

        // Update existing Product
        $scope.update = function () {
            var product = $scope.product;

            product.$update(function () {
                $location.path('products/' + product._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Products
        $scope.find = function () {
            $scope.products = Products.query();
        };

        // Find existing Product
        $scope.findOne = function () {
            $scope.product = Products.get({
                productId: $stateParams.productId
            });
        };
    }
]);