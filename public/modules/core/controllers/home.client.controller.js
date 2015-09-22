'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Products',
	function($scope, Authentication, Products) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		// Find a list of Products
	    $scope.find = function () {
	        $scope.products = Products.query();
	    };
			console.log($scope.find);
	}
]);
