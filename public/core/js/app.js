var app = angular.module('passport-app', ['ui.router','common.login.module', 'common.register.module']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise("/home");

	$stateProvider
	.state("home",{
		url : "/home",
		templateUrl : "core/templates/main.html",
		controller : function($state, $rootScope){
			if(!$rootScope.user){
				$state.go("home.login");
			}
		}
	})
	.state("home.login", {
		url : "/login",
		templateUrl : "common/login/login.html"
	})
	.state("home.register", {
		url : "/register",
		templateUrl : "common/register/register.html"
	})
	.state("logout",{
		url : "/logout",
		controller: "logoutCtrl"
	})
	.state("profile",{
		url : "/profile",
		template: "<h3> Profile Page </h3>"
	})
	.state("about", {
		url : "/about",
		template : "<h3> About Page </h3>"
	})
	.state("contact", {
		url : "/contact",
		template : "<h3> Contact Page </h3>"
	})
}]);

app.controller("logoutCtrl", ["$http", "$rootScope", "$state", function($http, $rootScope, $state){	
	$http.put("/logout")
		.success(function(response){
			$rootScope.user = undefined;
			$state.go("home");
		});
}]);