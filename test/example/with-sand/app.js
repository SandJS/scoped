const sand = require('sand');
const http = require('sand-http');
const scoped = require('../../..');

module.exports = new sand({appPath: __dirname, log: '*'}).use(scoped).use(http).start();