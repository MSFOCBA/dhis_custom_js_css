customJsCss.controller('customcssController', ["$scope", "Style", function($scope, Style){
	
	$scope.title = "Edit Custom Css File";
	$scope.success = false;
	$scope.error = false;

	var editor = ace.edit("editor");
	editor.$blockScrolling = Infinity;
	editor.getSession().setMode("ace/mode/css");
	
	Style.Get().success(function (data) {
		editor.setValue(data, 0);
		editor.gotoLine(0);
	});

	$scope.sendFile = function() {
		Style.Post(editor.getValue())
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