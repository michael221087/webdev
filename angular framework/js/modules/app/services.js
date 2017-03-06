define(['angular'],function(){
	'use strict';
	angular.module('app.services', [])
	.value('version', '0.1')
	.factory('Service',["$http","$q",function($http,$q){
		var path = "/";
		this.getView = function(page_id) {
			var promise = $http({
				url: path+'view_page.php',
				method: "POST",
				params: { qsdata:  JSON.stringify({ page_id: page_id, platform: 1}) }
			}).then(function(res){
				return res.data;
			})
			return promise;
		}
		this.submit = function(data) {
			var promise = $http({
				url: path+'submit_form.php',
				method: "POST",
				params: { qsdata: JSON.stringify(data) }
			}).then(function(res){
				return res.data;
			})
			return promise;
		}
		
		return this;
	}])
});

