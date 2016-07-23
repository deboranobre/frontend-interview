/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var proxy = require('http-proxy-middleware');
var request = require('request');

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

var proxyOptions = {
    target: 'https://api.twitter.com/',
    changeOrigin: true
};

var options = {
    method: 'POST',
    url: 'https://api.twitter.com/oauth2/token',
    qs: { grant_type: 'client_credentials' },
    headers: {
        Authorization: 'Basic bWVjaTllbUI3MjA1Ymo0VzQ0eFFDQVRVNjowR0RKWWFUeDg1bkRwbm9pOHp3R2EwVDdNU1FJT1J0OVJkS3Y2aEFmRFNSb0QzUjRGUA=='
    }
};

request(options, function (error, response, body) {
    var perm_data = JSON.parse(body);

    console.log('body: ' + perm_data);
    console.log('token: ' + perm_data.access_token);

    proxyOptions.headers = {
        Authorization: 'Bearer ' + perm_data.access_token
    }

    app.use('/1.1', proxy(proxyOptions));
	
	switch (environment) {
	  case 'build':
		console.log('** BUILD **');
		app.use(express.static('./build/'));
		// Any invalid calls for templateUrls are under app/* and should return 404
		app.use('/app/*', function(req, res, next) {
		  four0four.send404(req, res);
		});
		// Any deep link calls should return index.html
		app.use('/*', express.static('./build/index.html'));
		break;
	  default:
		console.log('** DEV **');
		app.use(express.static('./src/client/'));
		app.use(express.static('./'));
		app.use(express.static('./tmp'));
		// Any invalid calls for templateUrls are under app/* and should return 404
		app.use('/app/*', function(req, res, next) {
		  four0four.send404(req, res);
		});
		// Any deep link calls should return index.html
		app.use('/*', express.static('./src/client/index.html'));
		break;
	}

	app.listen(port, function() {
	  console.log('Express server listening on port ' + port);
	  console.log('env = ' + app.get('env') +
		'\n__dirname = ' + __dirname +
		'\nprocess.cwd = ' + process.cwd());
	});
});


