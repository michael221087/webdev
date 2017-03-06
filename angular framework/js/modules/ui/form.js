define(['angular'], function() {
	angular.module("ui.form", [])
		.directive('selectbox', function() {
			return {
				restrict: 'C',
				scope: {
					ngModel: '='
				},
				replace: true,
				template: '<a ng-class="{active:ngModel}" ng-click="ngModel=!ngModel"></a>'
			}
		})
		.directive('uiPlaceholder', ['$timeout', function($timeout) {
			return {
				restrict: 'A',
				link: function(scope, ele, attr) {
					var txt = attr.uiPlaceholder || '';
					$timeout(function(){
						ele.val(txt).addClass('placeholder');
					});
					attr.$observe('uiPlaceholder', function(){
						txt = attr.uiPlaceholder || '';
						if (ele.hasClass('placeholder')) {
							ele.val(txt);
						}
					})
					ele.focus(function() {
						if (ele.hasClass('placeholder')) {
							ele.removeClass('placeholder');
							ele.val('');
						}
					}).blur(function() {
						if (ele.val() == '' || ele.val() == txt) {
							ele.addClass('placeholder');
							ele.val(txt);
						}
					});
				}
			}
		}])
		.directive('autoSelect', function() {
			return {
				restrict: 'A',
				link: function(scope, ele, attr) {
					ele.focus(function() {
						ele[0].setSelectionRange(0, 999);
					});
				}
			}
		})
		.directive('onDone', function() {
			return function(scope, ele, attrs) {
				ele.change(function() {
					scope.$apply(attrs.onDone);
					ele.blur();
				});
				ele.bind("keyup", function(e) {
					if (e.keyCode == 13) {
						scope.$apply(attrs.onEnter);
						ele.blur();
					}
				});
			}
		})
		.directive('noCutCopyPaste',function(){
			return{
				restrict:'A',
				link:function(scope, ele, attr){
					$(ele).bind("cut copy paste",function(e) {
						alert("剪貼無效。");
						e.preventDefault();
					});
				}
			}
		})
});