define(["angular"], function() {
	'use strict';
	angular.module('app.filters', [])
		.filter('hhmmss', function() {
			return function(input) {
				var hr = Math.floor(input / 3600).toString();
				var min = Math.floor((input % 3600) / 60).toString();
				var sec = (input % 60).toString();
				if (hr.length == 1) hr = "0" + hr;
				if (min.length == 1) min = "0" + min;
				if (sec.length == 1) sec = "0" + sec;
				var out = hr + ":" + min + ":" + sec;
				return out;
			}
		}).filter('range', function() {
			return function(input, start, end) {
				start = parseInt(start);
				end = parseInt(end);
				if (start > end) {
					for (var i = start; i >= end; i--)
						input.push(i);
					return input;
				} else {
					for (var i = start; i <= end; i++)
						input.push(i);
					return input;
				}
			};
		});
});