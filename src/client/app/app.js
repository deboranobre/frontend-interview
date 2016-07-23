(function() {
  'use strict';

  angular.module('twitterTimelineApp', [
  ])
	.constant('twitterUser', 'americanascom')
	.controller("twitterTimelineController", function($scope, $http, twitterService)
	{
		twitterService.getUserInfo().then(function(response){
			$scope.user = response;
			console.log($scope.user);
		});
		
		twitterService.getTweets().then(function(response){
			$scope.tweets = response;
			
			console.log($scope.tweets);
		});
		
		twitterService.getTrends().then(function(response){
			$scope.trends = response[0].trends;
			
			console.log($scope.trends);
		});
	});

})();
