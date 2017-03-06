define(['angular'], function() {
    angular.module("ui.utils", [])
        .directive('jscrollpane', function() {
            return {
                restrict: 'A',
                link: function(scope, ele, attr) {
                    var setting = scope.$eval(attr.uiJscrollpane) || {};
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
        })
        .directive('layerBtn',function() {
            return {
                restrict:'C',
                replace: true,
                template: '<a><span class="layer-hover" ng-transclude></span><span class="layer-idle" ng-transclude></span></a>',
                transclude: true,
                link:function(scope,ele,attr){
                }
            }
        })
        .directive('preloader', function() {
            return {
                replace: true,
                restrict: 'E',
                scope: {
                    url: '@url',
                    toTop: '@toTop'
                },
                transclude: true,
                template: '<div class="preloader" ng-show="$root.setting.showPreloader" style="position: fixed; top: 0; left: 0; background: rgba(0, 0, 0, 0.8) url({{url}}) center no-repeat; width: 100%; height: 100%; z-index: 1000;" ng-transclude></div>',
                link: function(scope, ele, attr) {
                    scope.url = scope.url? scope.url: 'images/preloader-s.gif';
                    scope.toTop = scope.toTop? scope.toTop: false;
                    if (scope.toTop) $('body').append(ele);
                    if (scope.$root.setting) {
                        if (scope.$root.setting.showPreloader) return;
                        scope.$root.setting.showPreloader = false;
                    } else {
                        scope.$root.setting = {
                            showPreloader: false
                        };
                    }
                }
            }
        })
        .directive('fixToBottom', function() {
            return {
                link: function(scope, ele, attr) {
                    var check = function(){
                        if ($(window).height() < $(document).height()) {
                            ele.removeClass('fix');
                        } else {
                            ele.addClass('fix');
                        }
                    }
                    $(window).resize(check);
                }
            }
        })
        .directive('openTnc', function() {
            return {
                replace: true,
                restrict: 'CA',
                template: function(element, attrs) {
                    var tag = element[0].nodeName;
                    return '<'+tag+' ng-click="$root.setting.showTNC=true">'+element.html()+'</'+tag+'>';
                }
            }
        })
        .directive('closeTnc', function() {
            return {
                replace: true,
                restrict: 'CA',
                template: function(element, attrs) {
                    var tag = element[0].nodeName;
                    return '<'+tag+' ng-click="$root.setting.showTNC=false">'+element.html()+'</'+tag+'>';
                }
            }
        })
        .directive('tnc', function() {
            return {
                replace: true,
                restrict: 'E',
                scope: {
                    url: '@url',
                    toTop: '@toTop'
                },
                template: '<div ng-show="$root.setting.showTNC" ng-include="url"></div>',
                link: function(scope, ele, attr) {
                    if (scope.toTop) $('body').append(ele);
                    if (scope.$root.setting) {
                        scope.$root.setting.showTNC = false;
                    } else {
                        scope.$root.setting = {
                            showTNC: false
                        };
                    }
                }
            }
        })
// Popup directive by Chris Chan 2015/05/14
        .directive('openPopup', function() {
            return {
                replace: true,
                restrict: 'CA',
                scope: {
                    url: '@url',
                    popupId: '@popupId'
                },
                template: function(element, attrs) {
                    if (!attrs.popupId) {
                        attrs.popupId = 'popup';
                    }

                    var tag = element[0].nodeName;
                    if (!attrs.url) {
                         return '<'+tag+' ng-click="$root.setting.'+attrs.popupId+'.showPopup=true;">'+element.html()+'</'+tag+'>';
                    } else {
                        return '<'+tag+' ng-click="$root.setting.'+attrs.popupId+'.showPopup=true;$root.setting.'+attrs.popupId+'.popupUrl=&apos;'+attrs.url+'&apos;">'+element.html()+'</'+tag+'>';
                    }
                }
            }
        })
        .directive('closePopup', function() {
            return {
                replace: true,
                restrict: 'CA',
                scope: {
                    popupId: '@popupId'
                },
                template: function(element, attrs) {
                    if (!attrs.popupId) {
                        attrs.popupId = 'popup';
                    }

                    var tag = element[0].nodeName;
                    return '<'+tag+' ng-click="$root.setting.'+attrs.popupId+'.showPopup=false;">'+element.html()+'</'+tag+'>';
                }
            }
        })
        .directive('changePopup', function() {
            return {
                replace: true,
                restrict: 'CA',
                scope: {
                    url: '@url',
                    popupId: '@popupId'
                },
                template: function(element, attrs) {
                    if (!attrs.popupId) {
                        attrs.popupId = 'popup';
                    }

                    if (!attrs.url) {
                        attrs.url = "";
                    }

                    var tag = element[0].nodeName;
                    return '<'+tag+' ng-click="$root.setting.'+attrs.popupId+'.popupUrl=&apos;'+attrs.url+'&apos;">'+element.html()+'</'+tag+'>';
                }
            }
        })
        .directive('includeContent', function() {
            return {
                replace: true,
                restrict: 'CA',
                scope: {
                    popupId: '@popupId'
                },
                template: function(element, attrs) {
                    if (!attrs.popupId) {
                        attrs.popupId = 'popup';
                    }

                    var tag = element[0].nodeName;
                    return '<'+tag+' ng-include="$root.setting.'+attrs.popupId+'.popupUrl"></'+tag+'>';
                }
            }
        })
        .directive('popup', function() {
            return {
                replace: true,
                restrict: 'E',
                scope: {
                    url: '@url',
                    toTop: '@toTop',
                    popupId: '@popupId'
                },
                template: function(element, attrs) {
                    if (!attrs.popupId) {
                        attrs.popupId = 'popup';
                    }

                    if (!attrs.url) {
                        attrs.url = '';
                    }

                    var _html 
                        = '<div ng-show="$root.setting.'+attrs.popupId+'.showPopup" class="ng-scope">'
                        + '<div ng-cloak class="popup" id="'+attrs.popupId+'">'
                        + '<div class="bg close-popup" popup-id="'+attrs.popupId+'"></div>'
                        + '<div class="popupContentBox">'
                        + '<div class="include-content" popup-id="'+attrs.popupId+'"></div>'
                        + '<a class="btnClose imgBtn close-popup" href="" popup-id="'+attrs.popupId+'"></a>'
                        + '</div>'
                        + '</div>'
                        + '</div>';

                    return _html;
                },
                link: function(scope, ele, attr) {
                    if (scope.toTop) $('body').append(ele);
                    
                    if (scope.$root.setting) {
                    } else {
                        scope.$root.setting = {};
                    }
                    scope.$root.setting[scope.popupId] = {
                        showPopup: false,
                        popupUrl: scope.url
                    };
                }
            }
        })
// End Popup directive by Chris Chan 2015/05/14
        .directive('overlay', function() {
            return {
                restrict: 'AC',
                link: function(scope, ele, attr) {
                    ele.css('pointer-events', 'none');
                    ele.click(function(e) {
                        e.preventDefault();
                        $(this).hide();
                        var $clickedItemBelow = $(document.elementFromPoint(e.clientX, e.clientY));
                        $clickedItemBelow.trigger(e);
                        $(this).show();
                    });
                }
            }
        })
   
});