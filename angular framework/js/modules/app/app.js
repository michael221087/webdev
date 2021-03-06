define([
	'./services',
	'./filters',
	'./directives',
	'./controllers',
	'./routes',
	'angular',
	'angularAnimate',
	'angularLoadingBar',
	'ui/utils',
	'ui/editor',
	'ui/mobile',
	"ui/touchaction",
	"ui/form"
	],function(){
		'use strict';

		angular.module('app',[
			'app.filters',
			'app.services',
			'app.directives',
			'app.controllers',
			'app.routes',
			'ngAnimate',
			'angular-loading-bar',
			'ui.utils',
			'ui.editor',
			'ui.mobile',
			"ui.touchaction",
			"ui.form"
		]);
	}
);