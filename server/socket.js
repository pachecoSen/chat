"use strict";

const {resolve} = require('path'),
    socketIO = require('socket.io');

const {server} = require(resolve(__dirname, './../index'));
const io = socketIO(server);

