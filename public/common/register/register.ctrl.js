angular.module("common.register.module", [])
.controller("common.register.module.registerCtrl", ['$http', "$state", "$rootScope", function($http, $state, $rootScope){
	this.register = function(user){
		$rootScope.message = undefined;
		$rootScope.errorCode = undefined;
		$rootScope.user = undefined;
		if(user.password != user.confirmpassword){
			$rootScope.message = "passwords doesn't match !";
			return;			
		}
		$http.post("/register", {email: user.email, password: user.password})
		.success(function(response){
			console.log(response);
			if(response.errorCode){
				$rootScope.errorCode = response.errorCode;
				$rootScope.message = response.message;
				$rootScope.user = undefined;
			}
			else{
				$rootScope.message = undefined;
				$rootScope.errorCode = undefined;
				$rootScope.user = response.user;
				$state.go("home");
			}
		});
	};

	this.reset = function(){
		$rootScope.message = undefined;
		$rootScope.errorCode = undefined;
		$rootScope.user = undefined;
	}
}]);