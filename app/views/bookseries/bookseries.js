"use strict";

angular.module("larsson-library.bookseries", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider
		.when("/bookseries", {
			templateUrl: "views/bookseries/bookseries.html",
			controller: "BookSeriesViewController"
		})
		.when('/bookseries/new', {
			templateUrl: "views/bookseries/bookseries-edit.html",
			controller: "BookSeriesViewController"
		})
		.when('/bookseries/:bookSeriesID', {
			templateUrl: "views/bookseries/bookseries-detail.html",
			controller: "BookSeriesViewController"
		})
		.when('/bookseries/:bookSeriesID/edit', {
			templateUrl: "views/bookseries/bookseries-edit.html",
			controller: "BookSeriesViewController"
		})
		;
	}
]).controller("BookSeriesViewController", [
	"$scope",
	"$location",
	"$routeParams",
	"BookSeries",
	"Author",
	"Book",
	function($scope, $location, $routeParams, BookSeries, Author, Book) {
		$scope.$parent.Title = "Book Series";
		$(".mdl-layout__drawer, .mdl-layout__obfuscator").removeClass("is-visible");
		if ($routeParams.bookSeriesID) {
			$scope.currentBookSeries = {};
			$scope.books = [];
			$scope.authors = [];
			BookSeries.read($routeParams.bookSeriesID).success(function(data) {
				$scope.currentBookSeries = data;
			});
			Book.readByBookSeries($routeParams.bookSeriesID).success(function(data) {
				$scope.books = data;
			});
			Author.readAll().success(function(data) {
				for (var i = 0; i < data.length; i ++) {
					$scope.authors[data[i].AuthorID] = data[i];
				}
			});
		} else {
			$scope.bookserieses = [];
			BookSeries.readAll().success(function(data) {
				$scope.bookserieses = data;
			});
		}
		$scope.new = function() {
			$location.path("/bookseries/new");
		}
		$scope.detail = function(bookSeriesID) {
			if (bookSeriesID) {
				$location.path("/bookseries/" + bookSeriesID);
			} else {
				$location.path("/bookseries");
			}
		}
		$scope.edit = function(bookSeriesID) {
			$location.path("/bookseries/" + bookSeriesID + "/edit");
		}
		$scope.save = function() {
			(($scope.currentBookSeries.BookSeriesID)
				? BookSeries.update($scope.currentBookSeries).success(function(data) {
					$location.path("/bookseries/" + $scope.currentBookSeries.BookSeriesID);
				})
				: BookSeries.create($scope.currentBookSeries).success(function(data) {
					$location.path("/bookseries/" + data.BookSeriesID);
				})
			);
		}
		$scope.remove = function(bookSeriesID) {
			BookSeries.remove(bookSeriesID).success(function() {
				BookSeries.readAll().success(function(data) {
					$scope.bookserieses = data;
				});
			});
		}
		$scope.bookDetail = function(bookID) {
			$location.path("/book/" + bookID);
		}
	}
]);
