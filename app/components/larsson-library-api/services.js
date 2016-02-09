"use strict";

angular.module("larsson-library-api-services", [
	"larsson-library-config"
]).factory("Author", [
	"$http",
	"config",
	function($http, config) {
		return {
			create: function(author) {
				return $http({
					method: "POST",
					url: config.API_BASE_URL + "/author/",
					responseType: "json",
					data: author
				});
			},
			read: function(id) {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/author/",
					responseType: "json",
					params: {
						AuthorID: id
					}
				});
			},
			readAll: function() {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/author/",
					responseType: "json"
				});
			},
			update: function(author) {
				return $http({
					method: "PUT",
					url: config.API_BASE_URL + "/author/",
					responseType: "json",
					data: author
				});
			},
			remove: function(id) {
				return $http({
					method: "DELETE",
					url: config.API_BASE_URL + "/author/",
					responseType: "json",
					params: {
						AuthorID: id
					}
				});
			}
		};
	}
]).factory("Book", [
	"$http",
	"config",
	function($http, config) {
		return {
			create: function(book) {
				return $http({
					method: "POST",
					url: config.API_BASE_URL + "/book/",
					responseType: "json",
					data: book
				});
			},
			read: function(id) {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/book/",
					responseType: "json",
					params: {
						BookID: id
					}
				});
			},
			readByISBN13: function(isbn13) {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/book/",
					responseType: "json",
					params: {
						ISBN13: isbn13
					}
				});
			},
			readByAuthor: function(authorID) {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/book/",
					responseType: "json",
					params: {
						AuthorID: authorID
					}
				});
			},
			readByBookSeries: function(bookSeriesID) {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/book/",
					responseType: "json",
					params: {
						BookSeriesID: bookSeriesID
					}
				});
			},
			readAll: function() {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/book/",
					responseType: "json"
				});
			},
			update: function(book) {
				return $http({
					method: "PUT",
					url: config.API_BASE_URL + "/book/",
					responseType: "json",
					data: book
				});
			},
			remove: function(id) {
				return $http({
					method: "DELETE",
					url: config.API_BASE_URL + "/book/",
					responseType: "json",
					params: {
						BookID: id
					}
				});
			}
		};
	}
]).factory("BookSeries", [
	"$http",
	"config",
	function($http, config) {
		return {
			create: function(bookSeries) {
				return $http({
					method: "POST",
					url: config.API_BASE_URL + "/bookseries/",
					responseType: "json",
					data: bookSeries
				});
			},
			read: function(id) {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/bookseries/",
					responseType: "json",
					params: {
						BookSeriesID: id
					}
				});
			},
			readAll: function() {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/bookseries/",
					responseType: "json"
				});
			},
			update: function(bookSeries) {
				return $http({
					method: "PUT",
					url: config.API_BASE_URL + "/bookseries/",
					responseType: "json",
					data: bookSeries
				});
			},
			remove: function(id) {
				return $http({
					method: "DELETE",
					url: config.API_BASE_URL + "/bookseries/",
					responseType: "json",
					params: {
						BookSeriesID: id
					}
				});
			}
		};
	}
]).factory("Checkout", [
	"$http",
	"config",
	function($http, config) {
		return {
			create: function(checkout) {
				return $http({
					method: "POST",
					url: config.API_BASE_URL + "/checkout/",
					responseType: "json",
					data: checkout
				});
			},
			read: function(id) {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/checkout/",
					responseType: "json",
					params: {
						CheckoutID: id
					}
				});
			},
			readAll: function() {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/checkout/",
					responseType: "json"
				});
			},
			update: function(checkout) {
				return $http({
					method: "PUT",
					url: config.API_BASE_URL + "/checkout/",
					responseType: "json",
					data: checkout
				});
			},
			remove: function(id) {
				return $http({
					method: "DELETE",
					url: config.API_BASE_URL + "/checkout/",
					responseType: "json",
					params: {
						CheckoutID: id
					}
				});
			}
		};
	}
]).factory("User", [
	"$http",
	"config",
	function($http, config) {
		return {
			create: function(user) {
				return $http({
					method: "POST",
					url: config.API_BASE_URL + "/user/",
					responseType: "json",
					data: user
				});
			},
			read: function(id) {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/user/",
					responseType: "json",
					params: {
						UserID: id
					}
				});
			},
			readAll: function() {
				return $http({
					method: "GET",
					url: config.API_BASE_URL + "/user/",
					responseType: "json"
				});
			},
			update: function(user) {
				return $http({
					method: "PUT",
					url: config.API_BASE_URL + "/user/",
					responseType: "json",
					data: user
				});
			},
			remove: function(id) {
				return $http({
					method: "DELETE",
					url: config.API_BASE_URL + "/user/",
					responseType: "json",
					params: {
						UserID: id
					}
				});
			}
		};
	}
]);
