var seaport = require('seaport');
var express = require('express');

var Searoute = function(host, port) {
	var endpoint = express();

	endpoint.ports = seaport.connect(host, port);

	endpoint.ports.on('connect', function() {
		console.log('connected to seaport');
	});

	endpoint.register = function(name) {
		endpoint.set('port', endpoint.ports.register(name));
		endpoint.listen(endpoint.get('port'));
	}

	return endpoint;
}

module.exports = Searoute;
