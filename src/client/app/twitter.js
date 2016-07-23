(function() {
    'use strict';

    angular
    .module('twitterTimelineApp')
    .factory('twitterService', function ($http, twitterUser) {
		return {
			getTweets: getTweets,
			getUserInfo: getUserInfo,
			getTrends: getTrends
		};
		

		function getUserInfo() {
			return $http.get('/1.1/users/show.json?screen_name=' + twitterUser)
				.then(function(response){return response.data;});
		}
	
		function getTweets() {
			return $http.get('1.1/statuses/user_timeline.json?screen_name=' + twitterUser + '&count=10&exclude_replies=true&include_rts=true')
				.then(function(response){return response.data;});
		}
		
		function getTrends() {
			return $http.get('1.1/trends/place.json?id=1&count=5')
				.then(function(response){return response.data;});
		}
});

})();
