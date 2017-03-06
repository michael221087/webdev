/* Controllers */

define(['angular', '_', 'tweenmax'], function() {

	angular.module('app.controllers', [])

	.controller('RootCtrl', ['$scope', '$rootScope', '$location', 'Service', '$sce',
		function($scope, $rootScope, $location, Service, $sce) {
			$rootScope.setting = {};
			$rootScope.userData = {};
			$rootScope.$on("$routeChangeStart", function(event, current, previous, resolve) {});
			$rootScope.$on("$routeChangeSuccess", function(event, current, previous, resolve) {
				$rootScope.setting.location = $location.path();
				$rootScope.scrollTo(0);
			});

			$rootScope.scrollTo = function(_val){
				$('body,html').animate({scrollTop:_val}, 300);
			}

			$rootScope.scrollToSelector = function(selector){
				var scrollPos = $(selector).offset().top;
				$('body, html').animate({'scrollTop':scrollPos},300);
			}

		}
	])

	.controller('slotsCtrl', ['$scope','$rootScope', '$timeout', '$location', 'Service', function($scope, $rootScope, $timeout, $location, Service) {
			


			$scope.toResult = function(){

				$location.path('/result');
			}

			

		}
	])

	.controller('resultCtrl', ['$rootScope','$scope', "$timeout", "$location", 'Service',
		function($rootScope, $scope, $timeout, $location, Service) {

		}
	])

});