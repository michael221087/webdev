define(["masonry", "imagesLoaded", 'angular', "_"], function(Masonry, imagesLoaded) {
	angular.module("ui.masonry", [])
	.directive("masonry", ['$timeout',
		function($timeout) {
			return {
				restrict: "CA",
				scope: true,
				link: function(scope, ele, attrs) {
					var reload, layout, masonry, onReload, $items;
					var setting = scope.$eval(attrs.masonry) || {};
					var option = angular.extend({
						itemSelector: "[masonry-item],.masonry-item",
						transitionDuration: '0',//'0.2s',
						transitionDelay: '0.04',
						isFitWidth: true
					}, setting);
					masonry = new Masonry(ele[0], option);
					$items = [];
					reload = _.debounce(function() {
						$timeout(function(){
							masonry.reloadItems();
							masonry.layout();
						});
					},50);
					layout = _.debounce(function() {
						masonry.layout();
					},50);
					onReload = function(e){
						if (typeof e.stopPropagation !== "undefined") {
							e.stopPropagation();
						}
						reload();
					};

					$(window).on("resize", reload);
					scope.$on("masonry.reload", onReload);
					scope.$on("masonry.append", function(e, itemEle){
						//masonry.appended(itemEle[0]);
						$timeout(function(){
							itemEle.addClass('masonry-show');
							$items.shift();
						}, Number(option.transitionDelay) * 1000 * $items.length );
						$items.push(itemEle);
						reload();
					});
					scope.$on("masonry.remove", function(e, itemEle){
						masonry.remove( itemEle[0] );
						layout();
					});
					scope.$on("$destroy", function(e) {
						if (masonry) {
							$(window).off("resize", reload);
							masonry.destroy();
							masonry = null;
						}
					});
				}
			};
		}
	])
	.directive("masonryItem", ['$timeout',
		function($timeout) {
		return {
			restrict: "CA",
			link: function(scope, ele, attrs) {
				$timeout(function(){
					ele.imagesLoaded(function (){
						scope.$emit('masonry.append',ele);
					});
				});
				scope.$on("$destroy", function(e) {
					scope.$emit("masonry.remove",ele);
				});
			}
		};
	}])
});