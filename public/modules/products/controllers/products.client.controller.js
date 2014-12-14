    'use strict';

    // Products controller

    angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories','$upload',
        function ($scope, $stateParams, $location, Authentication, Products, Categories,$upload ) {
            $scope.authentication = Authentication;

    //file upload using ng-file-upload
     $scope.uploadedImage =false; // image path
    $scope.imageList = [];
    $scope.onFileSelect = function(image) {

            if (angular.isArray(image)) {
                image = image[0];
            }

            // This is how I handle file types in client side
            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                alert('Only PNG and JPEG are accepted.');
                return;
            }

            $scope.uploadInProgress = true;
            $scope.uploadProgress = 0;
 
            $scope.upload = $upload.upload({
                url: '/products/upload/image',
                method: 'POST',
                file: image
            }).progress(function(event) {
                $scope.uploadProgress = Math.floor(event.loaded / event.total);
                $scope.$apply();
            }).success(function(data, status, headers, config) {
                $scope.uploadInProgress = false;
                // If you need uploaded file immediately 
                $scope.uploadedImage =window.location.protocol + "//" + window.location.host+JSON.parse(data).replace('public',''); 
                $scope.imageList.push($scope.uploadedImage);
                    
            }).error(function(err) {
                $scope.uploadInProgress = false;
                console.log('Error uploading file: ' + err.message || err);
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