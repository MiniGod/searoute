#!/usr/bin/env node

var searoute = require('../').Server;

var argv = require('yargs')
	.usage('Usage: $0 -s [seaport] -l [listen]')
	.default('l', 3000)
	.demand('seaport')
	.alias('s', 'seaport')
	.alias('l', 'listen')
	.argv;

var seaport    = argv.seaport || argv._[0];
var listenport = argv.listen  || argv._[1];

if (argv.version) {
    return console.log(require('../package.json').version);
}

var searouter = new searoute('localhost', seaport);
searouter.listen(listenport);
console.log("Listening on port", listenport);
