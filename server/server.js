"use strict";

const express = require('express'),
    http = require('http');

const app = express();

app.disable('x-powered-by');

require('./middleware/index')(app);
require('./routes/index')(app);

let server = http.createServer(app);

module.exports = server;