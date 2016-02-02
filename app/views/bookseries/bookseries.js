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
		.when('/bookseries/:bookSeriesID', {
			templateUrl: "views/bookseries/bookseries-detail.html",
			controller: "BookSeriesViewController"
		})
		.when('/author/new', {
			templateUrl: "views/bookseries/bookseries-detail.html",
			controller: "BookSeriesViewController"
		})
		;
	}
]).controller("BookSeriesViewController", [
	"$scope",
	"$location",
	"$routeParams",
	"BookSeries",
	function($scope, $location, $routeParams, BookSeries) {
		$scope.$parent.Title = "Book Series";
		$(".mdl-layout__drawer, .mdl-layout__obfuscator").removeClass("is-visible");
		if ($routeParams.bookSeriesID) {
			$scope.currentBookSeries = {};
			BookSeries.read($routeParams.bookSeriesID).success(function(data) {
				$scope.currentBookSeries = data;
			});
		} else {
			$scope.bookserieses = [];
			BookSeries.readAll().success(function(data) {
				$scope.bookserieses = data;
			});
		}
		$scope.save = function() {
			(($scope.currentBookSeries.BookSeriesID)
				? BookSeries.update($scope.currentBookSeries).success(function(data) {
					$location.path("/bookseries");
				})
				: BookSeries.create($scope.currentBookSeries).success(function(data) {
					$location.path("/bookseries");
				})
			);
		}
		$scope.edit = function(bookSeriesID) {
			$location.path("/bookseries/" + bookSeriesID);
		}
		$scope.new = function() {
			$location.path("/bookseries/new");
		}
		$scope.remove = function(bookSeriesID) {
			BookSeries.remove(bookSeriesID).success(function() {
				BookSeries.readAll().success(function(data) {
					$scope.bookserieses = data;
				});
			});
		}
	}
]);
