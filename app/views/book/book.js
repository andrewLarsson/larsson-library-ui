"use strict";

angular.module("larsson-library.book", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.when("/book", {
			templateUrl: "views/book/book.html",
			controller: "BookViewController"
		});
	}
]).controller("BookViewController", [
	"$scope",
	"Book",
	"Author",
	"BookSeries",
	function($scope, Book, Author, BookSeries) {
		$scope.currentBook = {};
		$scope.books = [];
		$scope.authors = [];
		$scope.bookserieses = [];
		Book.readAll().success(function(data) {
			$scope.books = data;
		});
		Author.readAll().success(function(data) {
			$scope.authors = data;
		});
		BookSeries.readAll().success(function(data) {
			$scope.bookserieses = data;
		});
		$scope.save = function() {
			(($scope.currentBook.BookID)
				? Book.update($scope.currentBook).success(function() {
					$scope.currentBook = {};
					Book.readAll().success(function(data) {
						$scope.books = data;
					});
				})
				: Book.create($scope.currentBook).success(function() {
					$scope.currentBook = {};
					Book.readAll().success(function(data) {
						$scope.books = data;
					});
				})
			);
		}
		$scope.edit = function(bookID) {
			for (var i = 0; i < $scope.books.length; i ++) {
				if ($scope.books[i].BookID == bookID) {
					$scope.currentBook = $scope.books[i];
					break;
				}
			}
		}
		$scope.remove = function(bookID) {
			Book.remove(bookID).success(function() {
				$scope.currentBook = {};
				Book.readAll().success(function(data) {
					$scope.books = data;
				});
			});
		}
	}
]);
