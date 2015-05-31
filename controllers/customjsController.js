customJsCss.controller('customjsController', ["$scope", "Script", function($scope, Script){
	
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
			})
			.error( function(){
				$scope.error = true;
			});
	};
	
	editor.on("change", function(){
		$scope.success = false;
		$scope.error = false;
	});
	
}] );