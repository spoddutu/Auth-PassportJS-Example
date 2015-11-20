angular.module("common.login.module",[])
.controller("common.login.module.loginCtrl", ["$http", "$state", "$rootScope", function($http, $state, $rootScope){
	this.login = function(user){
		$http.post("/login", user)
		.success(function(response){
			if(response.errorCode){
				$rootScope.message = response.message;
				$rootScope.user = undefined;
			}
			else{
				$rootScope.message = undefined;
				$rootScope.user = response.user;
				$state.go("home");
			}
		});
	}
}]);