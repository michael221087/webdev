define(['angular', 'angularTouch', 'angularGesture'], function() {
  angular.module("ui.touchaction", [])
    .directive('touchaction', ['$parse',
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
              Hammer(ele[0]).on("touch", onTouch).on("dragstart", onDragStart).on("drag", onDrag).off("touch",onTouchEnd);
            }
            var clear = function() {
              ele.unbind('touchmove');
              Hammer(ele[0]).off("touch", onTouch).off("dragstart", onDragStart).off("drag", onDrag).off("touch",onTouchEnd);
            }
            var touchEnd = function(){
              Hammer(ele[0]).on("touchend", onTouchEnd);
            }
            var onTouchEnd = function(e){
              TweenMax.to(ele, 0.5, {top:321, ease:Bounce.easeOut, onComplete:function() {
                scope.dumbbellPosTop = false;
              }});
            }
            var onTouch = function(e) {
              TweenMax.killTweensOf(ele);
              $(".indicator").fadeOut();
               isDetected = false;
            }
            var onDragStart = function(e) {
              if(!isDetected){
                pos = ele.position();
                isDetected = true;
              }
            }
            var onDrag = function(e) {

              ele.css({
                'top': (pos.top + e.gesture.deltaY)
              });

              
              var gridH = ele.parent().height();
              var top = parseInt(ele.css('top').replace("px", ""));

              if(top>=gridH-ele.height()){ // attend bottom
                if(scope.dumbbellPosTop){
                  scope.dumbbellPosTop = false;
                }
                ele.css({'top':gridH-ele.height()});
              }


              if(top<=0){ // attend top
                if(!scope.dumbbellPosTop){
                  scope.dumbbellPosTop = true;
                  if(scope.numberCounter>0){
                    scope.numberCounter--;
                    $(".number-count span").text(scope.numberCounter);

                    // animation on complete once
                    TweenMax.to($(".number-count"), 0.3, {width:525, height:525, "border-color":"#1d5f79", color:"#1d5f79", "background-color":"transparent", ease:Linear.easeOut, onComplete:function() {

                        TweenMax.to($(".number-count"), 0.2, {width:345, height:345, "border-color":"#aaaaaa", color:"#aaaaaa", "background-color":"rgba(255, 255, 255, 0.2)", ease:Linear.easeOut});
                      }
                    });

                  }

                  if(scope.numberCounter==0){ // to result
                    clear();
                    setTimeout(function() {                      
                      scope.toResult();
                      scope.$apply();
                    }, 500);
                  }
                }
                ele.css({'top':0});
              }
            }
            init();
            touchEnd();
          }
        }
      }
    ])
});