define(['angular', 'angularTouch', 'angularGesture','parallax'], function() {
	angular.module("ui.parallax", [])
	.directive('piParallax',['$parse', function($parse) {
		return {
			restrict: 'AE',
			scope: true,
			link: function(scope, ele, attr){
				ParallaxManager.centerPos = scope.$eval(attr.piParallax);
				$(document).ready(function(event){
					window.ondevicemotion = function(event) {  
						if(!_.isUndefined(event.accelerationIncludingGravity)){
							var accelerationX = Math.round(event.accelerationIncludingGravity.x*10)/10,
								accelerationY = Math.round(event.accelerationIncludingGravity.y*10)/10,
								accelerationZ = Math.round(event.accelerationIncludingGravity.z*10)/10;
							
							var halfWidth = $(window).width()/2,
								halfHeight = $(window).height()/2,
								x = accelerationX * halfWidth;
								accelerationY = (accelerationY)<0?accelerationY*-1:accelerationY;
							var	y = (accelerationY-5) * halfHeight;

							x = halfWidth+(x*-1);
							y = halfHeight+y;
							ParallaxManager.update(x, y);
						}
					}
					if(!$.browser.mozilla && !($.browser.msie && $.browser.version < 9)){
						$(document).mousemove(function(event){
							var xp = event.pageX,
								yp = event.pageY;
							ParallaxManager.update(xp, yp);
						});
					}
				});
			}
		}
	}])
	.directive('piParallaxItem',['$parse', function($parse) {
		return {
			restrict: 'AE',
			scope: true,
			link: function(scope, ele, attr){
				$(document).ready(function(){
					var factor = scope.$eval(attr.piParallaxItem);
					ParallaxManager.add(ele, factor);
				})

			}
		}
	}])
});
