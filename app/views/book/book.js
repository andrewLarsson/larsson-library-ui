"use strict";

angular.module("larsson-library.book", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider
		.when("/book", {
			templateUrl: "views/book/book.html",
			controller: "BookViewController"
		})
		.when('/book/:bookID', {
			templateUrl: "views/book/book-detail.html",
			controller: "BookViewController"
		})
		.when('/author/new', {
			templateUrl: "views/book/book-detail.html",
			controller: "BookViewController"
		})
		;
	}
]).controller("BookViewController", [
	"$scope",
	"$location",
	"$routeParams",
	"Book",
	"Author",
	"BookSeries",
	function($scope, $location, $routeParams, Book, Author, BookSeries) {
		$scope.$parent.Title = "Books";
		$(".mdl-layout__drawer, .mdl-layout__obfuscator").removeClass("is-visible");
		if ($routeParams.bookID) {
			$scope.currentBook = {};
			$scope.authors = [];
			$scope.bookserieses = [];
			Book.read($routeParams.bookID).success(function(data) {
				$scope.currentBook = data;
			});
			Author.readAll().success(function(data) {
				$scope.authors = data;
			});
			BookSeries.readAll().success(function(data) {
				$scope.bookserieses = data;
			});
		} else {
			$scope.books = [];
			$scope.authors = [];
			$scope.bookserieses = [];
			Book.readAll().success(function(data) {
				$scope.books = data;
			});
			Author.readAll().success(function(data) {
				for (var i = 0; i < data.length; i ++) {
					$scope.authors[data[i].AuthorID] = data[i];
				}
			});
			BookSeries.readAll().success(function(data) {
				for (var i = 0; i < data.length; i ++) {
					$scope.bookserieses[data[i].BookSeriesID] = data[i];
				}
			});
		}
		$scope.save = function() {
			(($scope.currentBook.BookID)
				? Book.update($scope.currentBook).success(function(data) {
					$location.path("/book");
				})
				: Book.create($scope.currentBook).success(function(data) {
					$location.path("/book");
				})
			);
		}
		$scope.edit = function(bookID) {
			$location.path("/book/" + bookID);
		}
		$scope.new = function() {
			$location.path("/book/new");
		}
		$scope.remove = function(bookID) {
			Book.remove(bookID).success(function() {
				Book.readAll().success(function(data) {
					$scope.books = data;
				});
			});
		}
	}
]);
