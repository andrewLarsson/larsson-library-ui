"use strict";

angular.module("larsson-library.checkout", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider
		.when("/checkout", {
			templateUrl: "views/checkout/checkout.html",
			controller: "CheckoutViewController"
		})
		.when('/checkout/new', {
			templateUrl: "views/checkout/checkout-edit.html",
			controller: "CheckoutViewController"
		})
		.when('/checkout/book/:bookID', {
			templateUrl: "views/checkout/checkout-edit.html",
			controller: "CheckoutViewController"
		})
		.when('/checkout/:checkoutID', {
			templateUrl: "views/checkout/checkout-detail.html",
			controller: "CheckoutViewController"
		})
		.when('/checkout/:checkoutID/edit', {
			templateUrl: "views/checkout/checkout-edit.html",
			controller: "CheckoutViewController"
		})
		;
	}
]).controller("CheckoutViewController", [
	"$scope",
	"$location",
	"$routeParams",
	"$window",
	"$timeout",
	"Checkout",
	"Book",
	"User",
	function($scope, $location, $routeParams, $window, $timeout, Checkout, Book, User) {
		$scope.$parent.Title = "Checkouts";
		$(".mdl-layout__drawer, .mdl-layout__obfuscator").removeClass("is-visible");
		if ($routeParams.checkoutID || $routeParams.bookID) {
			$scope.currentCheckout = {};
			$scope.currentCheckout.Book = {};
			$scope.currentCheckout.User = {};
			$scope.books = [];
			$scope.users = [];
			Book.readAll().success(function(data) {
				$scope.books = data;
			});
			User.readAll().success(function(data) {
				$scope.users = data;
			});
			if ($routeParams.checkoutID) {
				Checkout.read($routeParams.checkoutID).success(function(data) {
					$scope.currentCheckout = data;
				}).then(function(nothing) {
					Book.read($scope.currentCheckout.BookID).success(function(data) {
						$scope.currentCheckout.Book = data;
					});
				}).then(function(nothing) {
					User.read($scope.currentCheckout.UserID).success(function(data) {
						$scope.currentCheckout.User = data;
					});
				});
			}
			if ($routeParams.bookID) {
				$scope.currentCheckout.BookID = $routeParams.bookID;
			}
		} else {
			$scope.checkouts = [];
			$scope.books = [];
			$scope.users = [];
			Checkout.readAll().success(function(data) {
				$scope.checkouts = data;
			});
			Book.readAll().success(function(data) {
				for (var i = 0; i < data.length; i ++) {
					$scope.books[data[i].BookID] = data[i];
				}
			});
			User.readAll().success(function(data) {
				for (var i = 0; i < data.length; i ++) {
					$scope.users[data[i].UserID] = data[i];
				}
			});
		}
		$scope.setISBN13SearchFocus = function() {
			$timeout(function() {
				var ISBN13SearchElement = $window.document.getElementById("ISBN13Search");
				if (ISBN13SearchElement) {
					ISBN13SearchElement.focus();
				}
			});
		}
		$scope.setISBN13SearchFocus();
		$scope.checkin = function(checkout) {
			var now = new Date();
			var dd = now.getDate();
			var mm = now.getMonth() + 1;
			var yyyy = now.getFullYear();
			var hr = now.getHours();
			var min = now.getMinutes();
			var sec = now.getSeconds();
			if (dd < 10){
				dd = "0" + dd;
			}
			if (mm < 10){
				mm = "0" + mm;
			}
			if (hr < 10){
				hr = "0" + hr;
			}
			if (min < 10){
				min = "0" + min;
			}
			if (sec < 10){
				sec = "0" + sec;
			}
			var timestamp = yyyy + "-" + mm + "-" + dd + " " + hr + ":" + min + ":" + sec;
			checkout.InDate = timestamp;
			Checkout.update(checkout).success(function(data) {
				$location.path("/checkout");
			});
		}
		$scope.searchByISBN13 = function(bookSearchISBN13) {
			Book.readByISBN13(bookSearchISBN13).success(function(data) {
				if (data.BookID) {
					$location.path("/checkout/book/" + data.BookID);
				}
			});
		}
		$scope.new = function() {
			$location.path("/checkout/new");
		}
		$scope.detail = function(checkoutID) {
			if (checkoutID) {
				$location.path("/checkout/" + checkoutID);
			} else {
				$location.path("/checkout");
			}
		}
		$scope.edit = function(checkoutID) {
			$location.path("/checkout/" + checkoutID + "/edit");
		}
		$scope.save = function() {
			(($scope.currentCheckout.CheckoutID)
				? Checkout.update($scope.currentCheckout).success(function(data) {
					$location.path("/checkout/" + $scope.currentCheckout.CheckoutID);
				})
				: Checkout.create($scope.currentCheckout).success(function(data) {
					$location.path("/checkout/" + data.CheckoutID);
				})
			);
		}
		$scope.remove = function(checkoutID) {
			Checkout.remove(checkoutID).success(function() {
				Checkout.readAll().success(function(data) {
					$scope.checkouts = data;
				});
			});
		}
	}
]);
