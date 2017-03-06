'use strict';
requirejs.config({
    paths: {
        facebook: '//connect.facebook.net/en_US/all'
    }
});

require([
	'app/app',
	'angularRoute',
	'angularTouch',
	'angularGesture',
	'angular',
	'jquery',
	'jqueryMigrate',
	'modernizr'
	],
	function(app){
		angular.bootstrap(document, ['app']);
		//require(['vendor/bootstrap/js/bootstrap'],function(){});
	}
)