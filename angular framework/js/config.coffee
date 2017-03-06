require
	baseUrl:"/js/"
	paths:
		modules:"modules"
		app:"modules/app"
		vendor:"vendor"

		angular:"../vendor/angular/stable/angular"
		jquery:"../vendor/jquery/jquery"
		jqueryMigrate:"../vendor/jquery/jquery-migrate"
		modernizr:"../vendor/modernizr/modernizr"
		_:"../vendor/underscore/underscore"
		json3:"../vendor/json3/json3"
	
	shim:
		'jquery':
			exports:["$","jQuery"]
		'jqueryMigrate' : deps:['jquery']
		'angular':
 			exports:'angular'
 			deps:['jquery'] #Fix for Code delay
		'angular-resource' : deps:['angular']
		'_':
			exports: '_'
	priority: [
		"angular"
	]
