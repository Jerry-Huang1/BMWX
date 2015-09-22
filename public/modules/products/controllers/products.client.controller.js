'use strict';

    // Products controller

    angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories','Upload','$timeout',
        function ($scope, $stateParams, $location, Authentication, Products, Categories,Upload,$timeout ) {
            $scope.authentication = Authentication;
            //new

    $scope.imageList = []; //liust of images
    $scope.uploadFiles = function(files) {
        $scope.files = files;
        angular.forEach(files, function(file) {

            if (file && !file.$error) {
         		file.upload = Upload.upload({
                  url: '/products/upload/image',
                  file: file
                });

                file.upload.then(function (response) {
                  $timeout(function () {
                    file.result = response.data.trim();
                    file.result=file.result.replace('public/','').replace(/['"]+/g, '');
                            //console.log(file.result);
                    $scope.imageList.push(file.result);
                  });
                }, function (response) {
                  if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                });
    		}
        });
    };


    //should using angular.each and _underscore
    $scope.categories = Categories.query();
    $scope.selectedCategories = [];
    $scope.selectedCategoryName=[];



    $scope.selectedIndex = 0;
    $scope.make = function (indx)
    {
        if ($scope.inArray($scope.selectedCategories, $scope.categories[indx]))
            return true;
    };
    $scope.selectingCategory = function (item, indx) {

        $scope.selectedIndex = indx;
        if ($scope.selectedCategories.length > 0) {

            if (!$scope.inArray($scope.selectedCategories, item)) {
                $scope.selectedCategories.push(item);
                 $scope.selectedCategoryName.push(item.name);
            }
            else
            {
                $scope.selectedCategories.splice($scope.selectedCategories.indexOf(item), 1);
                 $scope.selectedCategoryName.splice($scope.selectedCategoryName.indexOf(item), 1);
            }
        }
        else {
            $scope.selectedCategories.push(item);
            $scope.selectedCategoryName.push(item.name);
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
        image_url: $scope.imageList,
        category_collection: $scope.selectedCategoryName

    });

    // Redirect after save
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
