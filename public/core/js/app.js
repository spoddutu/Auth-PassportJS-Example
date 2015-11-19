var app = angular.module('passport-app', ['ui.router','common.login.module']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise("/home");

	$stateProvider
	.state("home",{
		url : "/home",
		templateUrl : "core/templates/main.html",
		controller : function($state){
			$state.go("home.login");
		}
	})
	.state("home.login", {
		url : "/login",
		templateUrl : "common/login/login.html"
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