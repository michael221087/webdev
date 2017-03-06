define(['angular', 'angularTouch', 'angularGesture'], function() {
  angular.module("ui.editor", [])
    .directive('transformer', ['$parse',
      function($parse) {
        return {
          restrict: 'AE',
          scope: true,
          link: function(scope, ele, attr) {
            var pos, rect, opos, isTransform;
            var init = function() {
              ele.bind('touchmove', function(e) {
                e.preventDefault()
              });
              Hammer(ele[0]).on("touch", onTouch).on("dragstart", onDragStart).on("drag", onDrag).on("transformstart", onTransformStart).on("transform", onTransform);
            }
            var clear = function() {
              ele.unbind('touchmove');
              Hammer(ele[0]).off("touch", onTouch).off("dragstart", onDragStart).off("drag", onDrag).off("transformstart", onTransformStart).off("transform", onTransform);
            }
            var onTouch = function(e) {
              isTransform = false;
            }
            var onDragStart = function(e) {
              pos = ele.position();
            }
            var onDrag = function(e) {
              if (isTransform) return;

              ele.css({
                'top': (pos.top + e.gesture.deltaY),
                'left': pos.left + e.gesture.deltaX
              });

              
              var gridW = ele.parent().width();
              var gridH = ele.parent().height();
              var top = parseInt(ele.css('top').replace("px", ""));
              var left = parseInt(ele.css('left').replace("px", ""));
              if(ele.width()==gridW) ele.css({'left':0});
              if(ele.height()==gridH) ele.css({'top':0});
              if(ele.height()-gridH+top<0) ele.css({'top':gridH-ele.height()});
              if(top>0) ele.css({'top':0});
              if(ele.width()-gridW+left<0) ele.css({'left':gridW-ele.width()});
              if(left>0) ele.css({'left':0});
            }
            var onTransformStart = function(e) {
              isTransform = true;
              pos = ele.position();
              rect = {
                width: ele.width(),
                height: ele.height()
              };
              opos = {
                x: e.gesture.center.pageX - ele.offset().left,
                y: e.gesture.center.pageY - ele.offset().top
              };
            }
            var onTransform = function(e) {
              var scale = e.gesture.scale;
              var scalem1 = e.gesture.scale - 1;
              
              ele.css({
                'top': pos.top - opos.y * scalem1,
                'left': pos.left - opos.x * scalem1,
                'width': rect.width * scale,
                'height': rect.height * scale
              });

              var gridW = ele.parent().width();
              var gridH = ele.parent().height();
              var minW = ele.css('min-width').replace("px", "");
              var minH = ele.css('min-height').replace("px", "");
              var top = parseInt(ele.css('top').replace("px", ""));
              var left = parseInt(ele.css('left').replace("px", ""));
              if(ele.width()==gridW) ele.css({'left':0});
              if(ele.height()==gridH) ele.css({'top':0});
              if(ele.height()-gridH+top<0) ele.css({'top':gridH-ele.height()});
              if(top>0) ele.css({'top':0});
              if(ele.width()-gridW+left<0) ele.css({'left':gridW-ele.width()});
              if(left>0) ele.css({'left':0});


            }
            // attr.$observe('transformer', function(isActive) {
            //   if ($parse(isActive)()) init();
            //   else clear();
            // })
            // scope.$on('$destroy', function() {
            //   clear();
            // });
            init();
          }
        }
      }
    ])
    .directive('fitImage',function() {
      return {
        restrict:'A',
        link:function(scope,ele,attr){
          var fitImage = function(){ 
            var w = ele[0].width;
            var h = ele[0].height;
            var pw = ele.parent().width();
            var ph = ele.parent().height();
            var horScale = pw / w;
            var verScale = ph / h;
            var imgScale = w/h;
            var scale = (horScale > verScale)? horScale: verScale;
            if(ele.parent().css('position')=='static') ele.parent().css('position', 'relative');
            ele.css({
              'position': 'absolute',
              'width': w * scale,
              'min-width': w * scale,
              'height': h * scale,
              'min-height': h * scale,
              'left': -(w * scale - pw) / 2,
              'top': -(h * scale - ph) / 2
            });
          }
          ele.bind("load" , fitImage);
          ele.addClass('fitImage');
          
          $(window).resize(function(){
            fitImage();
          })
        }
      }
    })
});