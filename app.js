
var customJsCss = angular.module('customJsCss', ['ngRoute','ngResource']);

customJsCss.config(function($routeProvider, $locationProvider) {
	
	$routeProvider.when('/customjs', {
		templateUrl: 'modules/customjs/customjsView.html',
		controller: 'customjsController'
	});
});

customJsCss.factory("script", function($resource){
	return $resource('http://localhost:8989/dhis/api/files/script');
});
