define(['angular', 'angularTouch', 'angularGesture'], function() {
   angular.module("ui.mobile", [])
      .directive('fixClassCtrl', function() {
         return {
            replace: true,
            restrict: 'A',
            template: function(element, attrs) {
               var tag = element[0].nodeName;
               return '<' + tag + ' hm-tap="$root.setting.isFixedHeader=!$root.setting.isFixedHeader" hm-drag-up="$root.setting.isFixedHeader=false" hm-drag-down="$root.setting.isFixedHeader=true">' + element.html() + '</' + tag + '>';
            }
         }
      })
      .directive('fixClass', function() {
         return {
            replace: true,
            restrict: 'A',
            template: function(element, attrs) {
               var tag = element[0].nodeName;
               return '<' + tag + ' ng-class="{fix: $root.setting.isFixedHeader}">' + element.html() + '</' + tag + '>';
            }
         }
      })
      .directive('a', function() {
         return {
            restrict: 'E',
            link: function(scope, ele, attr) {
               var hover = function(e) {
                  ele.addClass('hover');
               };
               var hout = function(e) {
                  ele.removeClass('hover');
               };
               ele[0].addEventListener('touchstart', hover);
               ele[0].addEventListener('touchend', hout);
               scope.$on('$destroy', function() {
                  ele[0].removeEventListener('touchstart', hover);
                  ele[0].removeEventListener('touchend', hout);
               });
            }
         }
      })
      .directive('safariDetector', function() {
         return {
            replace: true,
            restrict: 'E',
            scope: {
               src: '@src'
            },
            transclude: true,
            template: '<div class="safari-detector" style="position: fixed; top: 0; left: 0; background: rgba(0, 0, 0, 0.4) url({{src}}) center no-repeat; width: 100%; height: 100%; z-index: 1000;" ng-show="isInApp" ng-transclude></div>',
            link: function(scope, ele, attr) {
               scope.isInApp = false;
               if (!scope.src) scope.src = 'images/icon-browser-detector.png';
               var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
               if (iOS && window.navigator.userAgent.indexOf('Safari') == -1) scope.isInApp = true;
            }
         }
      })
      .directive('androidDetector', function() {
         return {
            replace: true,
            restrict: 'E',
            scope: {
               src: '@src'
            },
            transclude: true,
            template: '<div class="android-detector" style="position: fixed; top: 0; left: 0; background: rgba(0, 0, 0, 0.4) url({{src}}) center no-repeat; width: 100%; height: 100%; z-index: 1000;" ng-show="isAndroidInApp" ng-transclude></div>',
            link: function(scope, ele, attr) {
               scope.isAndroidInApp = false;
               if (!scope.src) scope.src = 'images/icon-android-browser-detector.png';
               var android = (navigator.userAgent.toLowerCase().match(/(android)/g) ? true : false);
               // if (android && window.navigator.userAgent.toLowerCase().match(/(fb)/g)) scope.isAndroidInApp = true;
               if (android){
                  if (window.navigator.userAgent.toLowerCase().match(/(fb)/g)) scope.isAndroidInApp = true;
                  if (!navigator.userAgent.toLowerCase().match(/(chrome)/g) && !navigator.userAgent.toLowerCase().match(/(firefox)/g) && !navigator.userAgent.toLowerCase().match(/(safari)/g)) scope.isAndroidInApp = true;
               }
            }
         }
      });
});