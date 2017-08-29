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
		.when('/user/new', {
			templateUrl: "views/user/user-edit.html",
			controller: "UserViewController"
		})
		.when('/user/:userID', {
			templateUrl: "views/user/user-detail.html",
			controller: "UserViewController"
		})
		.when('/user/:userID/edit', {
			templateUrl: "views/user/user-edit.html",
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
		$scope.new = function() {
			$location.path("/user/new");
		}
		$scope.detail = function(userID) {
			if (userID) {
				$location.path("/user/" + userID);
			} else {
				$location.path("/user");
			}
		}
		$scope.edit = function(userID) {
			$location.path("/user/" + userID + "/edit");
		}
		$scope.save = function() {
			(($scope.currentUser.UserID)
				? User.update($scope.currentUser).success(function(data) {
					$location.path("/user/" + $scope.currentUser.UserID);
				})
				: User.create($scope.currentUser).success(function(data) {
					$location.path("/user/" + data.UserID);
				})
			);
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
