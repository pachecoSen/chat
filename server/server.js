"use strict";

const config = require('./../config');

const express = require('express'),
    http = require('http');

const app = express();
app.use(express.static(config.DIR.PUBLIC));

let server = http.createServer(app);

module.exports = server;