customJsCss.controller('customjsController', ["$scope", "script", function($scope, script){
	
	script.get(function(data){
		$scope.content = data;
		console.log(data);		
	});
	
}] );