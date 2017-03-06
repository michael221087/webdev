define(['angular', 'jscrollpane', 'mousewheel'], function() {
    angular.module("ui.jscrollpane", [])
        .directive('jscrollpane', function() {
            return {
                restrict: 'A',
                link: function(scope, ele, attr) {
                    var setting = scope.$eval(attr.jscrollpane) || {};
                    var option = angular.extend({
                        autoReinitialise: true,
                        mouseWheelSpeed: 100,
                        hideFocus: true,
                        verticalDragMinHeight: 25
                    }, setting);

                    var api = $(ele).jScrollPane(option).data('jsp');
                    scope.$watch(function() {
                        api.reinitialise();
                    })

                    if (setting.hideOnBlur) {
                        $('.jspContainer .jspVerticalBar:first', ele).stop(true, false).fadeOut(500)
                        $(ele).mouseenter(function(e) {
                            $('.jspContainer .jspVerticalBar:first', ele).stop(true, true).fadeIn(500)
                        })
                        $(ele).mouseleave(function(e) {
                            $('.jspContainer .jspVerticalBar:first', ele).stop(true, true).fadeOut(500)
                        })
                    }
                }
            }
        });
});