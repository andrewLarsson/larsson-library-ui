"use strict";

angular.module("larsson-library.user", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.when("/user", {
			templateUrl: "views/user/user.html",
			controller: "UserViewController"
		});
	}
]).controller("UserViewController", [
	"$scope",
	"User",
	function($scope, User) {
		$scope.currentUser = {};
		$scope.users = [];
		User.readAll().success(function(data) {
			$scope.users = data;
		});
		$scope.save = function() {
			(($scope.currentUser.UserID)
				? User.update($scope.currentUser).success(function() {
					$scope.currentUser = {};
					User.readAll().success(function(data) {
						$scope.users = data;
					});
				})
				: User.create($scope.currentUser).success(function() {
					$scope.currentUser = {};
					User.readAll().success(function(data) {
						$scope.users = data;
					});
				})
			);
		}
		$scope.edit = function(userID) {
			for (var i = 0; i < $scope.users.length; i ++) {
				if ($scope.users[i].UserID == userID) {
					$scope.currentUser = $scope.users[i];
					break;
				}
			}
		}
		$scope.remove = function(userID) {
			User.remove(userID).success(function() {
				$scope.currentUser = {};
				User.readAll().success(function(data) {
					$scope.users = data;
				});
			});
		}
	}
]);
