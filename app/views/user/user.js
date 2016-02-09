"use strict";

angular.module("larsson-library.user", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider
		.when("/user", {
			templateUrl: "views/user/user.html",
			controller: "UserViewController"
		})
		.when('/user/:userID', {
			templateUrl: "views/user/user-detail.html",
			controller: "UserViewController"
		})
		.when('/user/new', {
			templateUrl: "views/user/user-detail.html",
			controller: "UserViewController"
		})
		;
	}
]).controller("UserViewController", [
	"$scope",
	"$location",
	"$routeParams",
	"User",
	function($scope, $location, $routeParams, User) {
		$scope.$parent.Title = "Users";
		$(".mdl-layout__drawer, .mdl-layout__obfuscator").removeClass("is-visible");
		if ($routeParams.userID) {
			$scope.currentUser = {};
			User.read($routeParams.userID).success(function(data) {
				$scope.currentUser = data;
			});
		} else {
			$scope.users = [];
			User.readAll().success(function(data) {
				$scope.users = data;
			});
		}
		$scope.save = function() {
			(($scope.currentUser.UserID)
				? User.update($scope.currentUser).success(function(data) {
					$location.path("/user");
				})
				: User.create($scope.currentUser).success(function(data) {
					$location.path("/user");
				})
			);
		}
		$scope.edit = function(userID) {
			$location.path("/user/" + userID);
		}
		$scope.new = function() {
			$location.path("/user/new");
		}
		$scope.remove = function(userID) {
			User.remove(userID).success(function() {
				User.readAll().success(function(data) {
					$scope.users = data;
				});
			});
		}
	}
]);
