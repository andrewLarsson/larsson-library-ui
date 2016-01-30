"use strict";

angular.module("larsson-library.checkout", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.when("/checkout", {
			templateUrl: "views/checkout/checkout.html",
			controller: "CheckoutViewController"
		});
	}
]).controller("CheckoutViewController", [
	"$scope",
	"Checkout",
	"Book",
	"User",
	function($scope, Checkout, Book, User) {
		$scope.currentCheckout = {};
		$scope.checkouts = [];
		$scope.books = [];
		$scope.users = [];
		Checkout.readAll().success(function(data) {
			$scope.checkouts = data;
		});
		Book.readAll().success(function(data) {
			$scope.books = data;
		});
		User.readAll().success(function(data) {
			$scope.users = data;
		});
		$scope.save = function() {
			(($scope.currentCheckout.CheckoutID)
				? Checkout.update($scope.currentCheckout).success(function() {
					$scope.currentCheckout = {};
					Checkout.readAll().success(function(data) {
						$scope.checkouts = data;
					});
				})
				: Checkout.create($scope.currentCheckout).success(function() {
					$scope.currentCheckout = {};
					Checkout.readAll().success(function(data) {
						$scope.checkouts = data;
					});
				})
			);
		}
		$scope.edit = function(checkoutID) {
			for (var i = 0; i < $scope.checkouts.length; i ++) {
				if ($scope.checkouts[i].CheckoutID == checkoutID) {
					$scope.currentCheckout = $scope.checkouts[i];
					break;
				}
			}
		}
		$scope.remove = function(checkoutID) {
			Checkout.remove(checkoutID).success(function() {
				$scope.currentCheckout = {};
				Checkout.readAll().success(function(data) {
					$scope.checkouts = data;
				});
			});
		}
	}
]);
