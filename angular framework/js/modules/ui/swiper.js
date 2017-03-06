define(['imagesLoaded', 'angular', "swiper"], function() {
	var doption = {
		//loop: true,
		grabCursor: true,
		updateOnImagesReady: true,
		//autoResize: true,
		//autoplay: 5000,
		//slidesPerView: 5,
	}
	angular.module("ui.swiper", [])
		.directive("swiper", ['$timeout',
			function($timeout) {
				return {
					replace: true,
					restrict: "A",
					//scope: {
					//	page: "=?",
					//	prevBtn: "@",
					//	nextBtn: "@"
					//}, 
					template: '<div class="swiper-container"><div class="swiper-wrapper" ng-transclude></div></div>',
					transclude: true,
					link: function(scope, ele, attrs) {
						var swiper, reload, onReload, checkBtn;
						var setting = scope.$eval(attrs.swiper) || {};
						var option = angular.copy(doption);
						angular.extend(option, setting);
						var prevBtn = setting.prevBtn? $(setting.prevBtn): null;
						var nextBtn = setting.nextBtn? $(setting.nextBtn): null;
						if (prevBtn) prevBtn.click(function(e){
							//scope.$apply(function(){
							//	--scope.page;
							//});
							swiper.swipePrev();
							checkBtn();
						});
						if (nextBtn) nextBtn.click(function(e){
							//scope.$apply(function(){
							//	++scope.page;
							//});
							swiper.swipeNext();
							checkBtn();
						});

						ele.imagesLoaded(function() {
							$timeout(function() {
								swiper = new Swiper('.swiper-container', option);
								//swiper.addCallback('SlideChangeEnd', function(swiper){
								//	scope.$apply(function(){
								//		scope.page = swiper.activeIndex;
								//	});
								//});
								//scope.$watch("page", function(nextPage, prevPage){
								//	//if (!option.loop) scope.page = Math.max(0, Math.min(scope.page, swiper.slides.length-1));
								//	if (prevPage!=nextPage && nextPage!=swiper.activeIndex) swiper.swipeTo(nextPage);
								//	checkBtn();
								//})
								//scope.page = scope.page || 0;
								checkBtn();
								scope.$emit('swiper.create', swiper);
							}, 300);
						});

						reload = _.debounce(function() {
							if (swiper) swiper.reInit();
							//scope.page = 0;
						}, 25);
						onReload = function(e) {
							if (typeof e.stopPropagation !== "undefined") {
								e.stopPropagation();
							}
							reload();
						};
						checkBtn = function() {
							if (option.loop || !swiper) return;
							if (prevBtn) {
								if (swiper.activeIndex == 0) prevBtn.addClass('disable');
								else prevBtn.removeClass('disable');
							}
							if (nextBtn) {
								if (swiper.activeIndex == swiper.slides.length-1) nextBtn.addClass('disable');
								else nextBtn.removeClass('disable');
							}
						}
						scope.$on("swiper.reload", onReload);
						scope.$on("swiper.item.loaded", onReload);
						scope.$on("$destroy", function(e) {
							if (swiper) {
								//swiper.removeCallbacks('SlideChangeEnd');
								swiper.destroy();
								swiper = null;
							}
						});
					}
				};
			}
		])
		.directive("swiperItem", function() {
			return {
				restrict: "CA",
    			template: '<div class="swiper-slide" ng-transclude></div>',
    			transclude: 'element',
    			replace: true,
				link: function(scope, ele, attrs) {
					ele.imagesLoaded(function() {
						scope.$emit('swiper.item.loaded');
					})
					scope.$on("$destroy", function(e) {
						//ele.parent().remove();
						scope.$emit("swiper.reload");
					});
				}
			};
		})
});