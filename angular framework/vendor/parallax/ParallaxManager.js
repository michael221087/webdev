// JavaScript Document

var ParallaxManager = {
	dict : [], 
	centerPos : { left:0, top:0 }, 
	add : function(obj, factor) {
		var $obj = $(obj);
		ParallaxManager.dict.push({'instance':$obj, 'left':parseInt($obj.css('left')), 'top':parseInt($obj.css('top')), 'factor':factor});
	}, 
	update : function(xp, yp) {
		var factor = 0.1;
		var dx = (xp - ParallaxManager.centerPos.left) * factor;
		var dy = (yp - ParallaxManager.centerPos.top) * factor;
		for (var str in ParallaxManager.dict) {
			var obj = ParallaxManager.dict[str];
			var xp = obj.instance.position().left + ((obj.left - dx * obj.factor) - obj.instance.position().left) * 0.2;
			var yp = obj.instance.position().top + ((obj.top - dy * obj.factor) - obj.instance.position().top) * 0.2;
			obj.instance.css({"left":xp, "top":yp});
			// var xp = Math.round( ((  ( (obj.left - dx) * obj.factor) - obj.instance.position().left) * 0.2) *100 ) /100;
			// var yp = Math.round( ((  ( (obj.top - dy) * obj.factor) - obj.instance.position().top) * 0.2) *100 ) /100;
			// obj.instance.css({"-webkit-transform":"translate("+xp+"px,"+yp+"px)"});
		}
	}
};
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
        	if (this[i] === obj) { return i; }
		}
		return -1;
	}
}