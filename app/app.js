"use strict";

angular.module("larsson-library", [
	"ngRoute",
	"larsson-library-api-services",
	"larsson-library.author",
	"larsson-library.book",
	"larsson-library.bookseries",
	"larsson-library.checkout",
	"larsson-library.user"
]).config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.otherwise({
			redirectTo: "/book"
		});
	}
])
.run(function($rootScope, $timeout) {
	$rootScope.$on("$viewContentLoaded", function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		})
	})
})
;
