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
		.when('/author/new', {
			templateUrl: "views/author/author-edit.html",
			controller: "AuthorViewController"
		})
		.when('/author/:authorID', {
			templateUrl: "views/author/author-detail.html",
			controller: "AuthorViewController"
		})
		.when('/author/:authorID/edit', {
			templateUrl: "views/author/author-edit.html",
			controller: "AuthorViewController"
		})
		;
	}
]).controller("AuthorViewController", [
	"$scope",
	"$location",
	"$routeParams",
	"Author",
	"Book",
	"BookSeries",
	function($scope, $location, $routeParams, Author, Book, BookSeries) {
		$scope.$parent.Title = "Authors";
		$(".mdl-layout__drawer, .mdl-layout__obfuscator").removeClass("is-visible");
		if ($routeParams.authorID) {
			$scope.currentAuthor = {};
			$scope.books = [];
			$scope.bookserieses = [];
			Author.read($routeParams.authorID).success(function(data) {
				$scope.currentAuthor = data;
			});
			Book.readByAuthor($routeParams.authorID).success(function(data) {
				$scope.books = data;
			});
			BookSeries.readAll().success(function(data) {
				for (var i = 0; i < data.length; i ++) {
					$scope.bookserieses[data[i].BookSeriesID] = data[i];
				}
			});
		} else {
			$scope.authors = [];
			Author.readAll().success(function(data) {
				$scope.authors = data;
			});
		}
		$scope.new = function() {
			$location.path("/author/new");
		}
		$scope.detail = function(authorID) {
			if (authorID) {
				$location.path("/author/" + authorID);
			} else {
				$location.path("/author");
			}
		}
		$scope.edit = function(authorID) {
			$location.path("/author/" + authorID + "/edit");
		}
		$scope.save = function() {
			(($scope.currentAuthor.AuthorID)
				? Author.update($scope.currentAuthor).success(function(data) {
					$location.path("/author/" + $scope.currentAuthor.AuthorID);
				})
				: Author.create($scope.currentAuthor).success(function(data) {
					$location.path("/author/" + data.AuthorID);
				})
			);
		}
		$scope.remove = function(authorID) {
			Author.remove(authorID).success(function() {
				Author.readAll().success(function(data) {
					$scope.authors = data;
				});
			});
		}
		$scope.bookDetail = function(bookID) {
			$location.path("/book/" + bookID);
		}
	}
]);
