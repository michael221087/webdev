define([
	'app/app', 'angularRoute', 'modernizr'
], function() {
	angular.module('app.routes', ['ngRoute']).config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider.when('/', {
				templateUrl: 'partials/home.html',
				controller: 'homeCtrl'
			})
			// $routeProvider.when('/form', {
			// 	templateUrl: 'partials/form.html',
			// 	controller: 'formCtrl'
			// })
			// $routeProvider.when('/game', {
			// 	templateUrl: 'partials/game.html',
			// 	controller: 'gameCtrl'
			// })
			// $routeProvider.when('/thanks', {
			// 	templateUrl: 'partials/thanks.html',
			// 	controller: 'thanksCtrl'
			// })
			.otherwise({
				redirectTo: '/'
			});
			//if (Modernizr.canvas) $locationProvider.html5Mode(true);
		}
	]);
});