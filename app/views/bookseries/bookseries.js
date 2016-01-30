"use strict";

angular.module("larsson-library.bookseries", [
	"ngRoute",
	"larsson-library-api-services"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.when("/bookseries", {
			templateUrl: "views/bookseries/bookseries.html",
			controller: "BookSeriesViewController"
		});
	}
]).controller("BookSeriesViewController", [
	"$scope",
	"BookSeries",
	function($scope, BookSeries) {
		$scope.currentBookSeries = {};
		$scope.bookserieses = [];
		BookSeries.readAll().success(function(data) {
			$scope.bookserieses = data;
		});
		$scope.save = function() {
			(($scope.currentBookSeries.BookSeriesID)
				? BookSeries.update($scope.currentBookSeries).success(function() {
					$scope.currentBookSeries = {};
					BookSeries.readAll().success(function(data) {
						$scope.bookserieses = data;
					});
				})
				: BookSeries.create($scope.currentBookSeries).success(function() {
					$scope.currentBookSeries = {};
					BookSeries.readAll().success(function(data) {
						$scope.bookserieses = data;
					});
				})
			);
		}
		$scope.edit = function(bookseriesID) {
			for (var i = 0; i < $scope.bookserieses.length; i ++) {
				if ($scope.bookserieses[i].BookSeriesID == bookseriesID) {
					$scope.currentBookSeries = $scope.bookserieses[i];
					break;
				}
			}
		}
		$scope.remove = function(bookseriesID) {
			BookSeries.remove(bookseriesID).success(function() {
				$scope.currentBookSeries = {};
				BookSeries.readAll().success(function(data) {
					$scope.bookserieses = data;
				});
			});
		}
	}
]);
