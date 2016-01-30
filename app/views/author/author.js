"use strict";

angular.module("larsson-library.author", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.when("/author", {
			templateUrl: "views/author/author.html",
			controller: "AuthorViewController"
		});
	}
]).controller("AuthorViewController", [
	"$scope",
	"Author",
	function($scope, Author) {
		$scope.currentAuthor = {};
		$scope.authors = [];
		Author.readAll().success(function(data) {
			$scope.authors = data;
		});
		$scope.save = function() {
			(($scope.currentAuthor.AuthorID)
				? Author.update($scope.currentAuthor).success(function() {
					$scope.currentAuthor = {};
					Author.readAll().success(function(data) {
						$scope.authors = data;
					});
				})
				: Author.create($scope.currentAuthor).success(function() {
					$scope.currentAuthor = {};
					Author.readAll().success(function(data) {
						$scope.authors = data;
					});
				})
			);
		}
		$scope.edit = function(authorID) {
			for (var i = 0; i < $scope.authors.length; i ++) {
				if ($scope.authors[i].AuthorID == authorID) {
					$scope.currentAuthor = $scope.authors[i];
					break;
				}
			}
		}
		$scope.remove = function(authorID) {
			Author.remove(authorID).success(function() {
				$scope.currentAuthor = {};
				Author.readAll().success(function(data) {
					$scope.authors = data;
				});
			});
		}
	}
]);
