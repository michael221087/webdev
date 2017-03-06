define(['imagesLoaded', 'angular', "swiper"], function() {
	angular.module("event.mouse", [])
		.directive("onStaticClick", ['$timeout',
			function($timeout) {
				return {
					restrict: "A",
					link: function(scope, ele, attrs) {
						var onMouseDown, onMouseMove, onMouseUp, pos, isStatic;
						var sco = scope;
						var onStaticClick = attrs.onStaticClick;
						onMouseDown = function(e) {
							isStatic = true;
							pos = { x:e.pageX, y:e.pageY };
							ele.on('mousemove', onMouseMove);
							ele.on('mouseup', onMouseUp);
						}
						onMouseMove = function(e) {
							if (Math.abs(e.pageX - pos.x) > 5 || Math.abs(e.pageY - pos.y) > 5 ) {
								isStatic = false;
							}
						}
						onMouseUp = function(e) {
							pos = null;
							ele.off('mousemove', onMouseMove);
							ele.off('mouseup', onMouseUp);
							if (isStatic) sco.$apply(onStaticClick);
						}
						ele.on('mousedown', onMouseDown);
						scope.$on("$destroy", function(e) {
							ele.off('mousedown', onMouseDown);
							ele.off('mousemove', onMouseMove);
							ele.off('mouseup', onMouseUp);
						});
					}
				};
			}
		])
});