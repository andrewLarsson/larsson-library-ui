"use strict";

angular.module("larsson-library.author", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider
		.when("/author", {
			templateUrl: "views/author/author.html",
			controller: "AuthorViewController"
		})
		.when('/author/:authorID', {
			templateUrl: "views/author/author-detail.html",
			controller: "AuthorViewController"
		})
		.when('/author/new', {
			templateUrl: "views/author/author-detail.html",
			controller: "AuthorViewController"
		})
		;
	}
]).controller("AuthorViewController", [
	"$scope",
	"$location",
	"$routeParams",
	"Author",
	function($scope, $location, $routeParams, Author) {
		$scope.$parent.Title = "Authors";
		$(".mdl-layout__drawer, .mdl-layout__obfuscator").removeClass("is-visible");
		if ($routeParams.authorID) {
			$scope.currentAuthor = {};
			Author.read($routeParams.authorID).success(function(data) {
				$scope.currentAuthor = data;
			});
		} else {
			$scope.authors = [];
			Author.readAll().success(function(data) {
				$scope.authors = data;
			});
		}
		$scope.save = function() {
			(($scope.currentAuthor.AuthorID)
				? Author.update($scope.currentAuthor).success(function(data) {
					$location.path("/author");
				})
				: Author.create($scope.currentAuthor).success(function(data) {
					$location.path("/author");
				})
			);
		}
		$scope.edit = function(authorID) {
			$location.path("/author/" + authorID);
		}
		$scope.new = function() {
			$location.path("/author/new");
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
