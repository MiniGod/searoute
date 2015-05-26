var Searoute = require('./');

var endpoint = Searoute.Endpoint('localhost', 9090);

endpoint.get('/', function(req, res) {
	res.end('YESSSS ' + JSON.stringify(req.query));
});

endpoint.get('/test', function(req, res) {
	res.end('NOOOOO');
});

endpoint.register('test');