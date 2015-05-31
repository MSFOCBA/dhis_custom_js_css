
var customJsCss = angular.module('customJsCss', ['ngRoute','ngResource']);

customJsCss.config(function($routeProvider, $locationProvider) {
	
	$routeProvider.when('/customjs', {
		templateUrl: 'views/codeEditorView.html',
		controller: 'customjsController'
	});
	
	$routeProvider.when('/customcss', {
		templateUrl: 'views/codeEditorView.html',
		controller: 'customcssController'
	});
});

var ApiUrl = $.parseJSON( $.ajax({
	type: "GET",
	dataType: "json",
	url: 'manifest.webapp',
	async: false
}).responseText).activities.dhis.href.replace( '/dhis-web-maintenance-appmanager', '' ) + '/api';

customJsCss.factory("Script", ['$http', function($http){
	return {
		Get: function (){
			return $http.get(ApiUrl + "/files/script");
		},
		Post: function (data){
			return $http({
				method: 'POST',
				url: ApiUrl + '/files/script',
				headers: {
					'Content-Type': 'application/javascript' 
				},
				data: data
			});
		}
	}
}]);

customJsCss.factory("Style", ['$http', function($http){
	return {
		Get: function (){
			return $http.get(ApiUrl + "/files/style");
		},
		Post: function (data){
			return $http({
				method: 'POST',
				url: ApiUrl + '/files/style',
				headers: {
					'Content-Type': 'text/css' 
				},
				data: data
			});
		}
	}
}]);
