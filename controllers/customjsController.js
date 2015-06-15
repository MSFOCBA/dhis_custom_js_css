customJsCss.controller('customjsController', ["$scope", "Script", "$timeout", function($scope, Script, $timeout){
	
	$scope.title = "Edit Custom Javascript File";
	$scope.success = false;
	$scope.error = false;
	
	var editor = ace.edit("editor");
	editor.$blockScrolling = Infinity
	editor.getSession().setMode("ace/mode/javascript");
	
	Script.Get().success(function (data) {
		editor.setValue(data, 0);
		editor.gotoLine(0);
	});

	$scope.sendFile = function() {
		Script.Post(editor.getValue())
			.success(function(){
				$scope.success = true;
				$timeout(function(){
					$scope.success = false;
				}, 3000);
			})
			.error( function(){
				$scope.error = true;
				$timeout(function(){
					$scope.error = false;
				}, 3000);
			});
	};
		
}] );