"use strict";

const {resolve} = require('path'),
    socketIO = require('socket.io'),
    moment = require('moment');

const {server} = require(resolve(__dirname, './../index'));
module.exports.io = socketIO(server);

const {DIR} = require(resolve(__dirname, './../config/index'));

const epoch = require(resolve(__dirname, './../src/helpers/epoch'));

const Logs = require(resolve(__dirname, './../src/classes/logs'));
const logs = new Logs();
logs.setPath(DIR.LOGS).setPrefijo('SYS.SOCKET').setName(epoch(moment().format('MMM DD, YYYY'))).setFormato('xml');

['inicio'].forEach(s => {
    const log = {
        'Route' : resolve(__dirname, `./socket/${s}`),
        'State' : 'ERR',
        'Date' : moment().format('MMM DD, YYYY'),
        'Time' : moment().format('HH:mm:ss')
    };
    try {
        require(`./socket/${s}`);
        log.State = 'OK';
        logs.addLog(log);   
    } catch (error) {
        logs.addLog(log);
    }
});
