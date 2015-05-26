var seaport = require('seaport');
var bouncy    = require('bouncy');

var Searoute = function(host, port) {
	this.ports = seaport.connect(host, port);
	this.server = bouncy(this._connectionListener.bind(this));
	this.allowedMethods = ['POST', 'GET', 'PUT', 'DELETE'];

	this.ports.on('connect', function() {
		console.log('connected to seaport');
	});
}

module.exports = Searoute;

Searoute.prototype._connectionListener = function(req, res, bounce) {
	// Filter out non allowed methods
	if (!~this.allowedMethods.indexOf(req.method)) {
		res.statusCode = 405;
		res.end('Method not allowed');
		return;
	}

	if (req.url === '/') {

		return;
	}

	// Extract endpoint from url
	var endpoint = req.url.match(/^\/([^\/\?]+)(.*)/);

	if (!endpoint) {
		res.statusCode = 400;
		res.end('Bad Request');
		return;
	}

	var url      = endpoint[2];
	var endpoint = endpoint[1];
	var version  = req.headers.version; // TODO: Check that it is semver: \d{2}.\d{2}.\d{2}

	console.log(url, endpoint);

	var query = version ? endpoint+'@<='+version : endpoint;
	var ports = this.ports.query(query);

	console.log(query, ports);

	if (ports.length === 0) {
		res.statusCode = 404;
		res.end('Not Found');
		return;
	}

	// todo: sort ports by highest version
	var port = ports[0];
	bounce({
		host: port.host,
		port: port.port,
		path: (/^\//.test(url)) ? url : '/' + url
	});
};

Searoute.prototype.listen = function(port) {
	return this.server.listen(port);
};
