"use strict";

const {resolve} = require('path'),
    moment = require('moment');

const {app} = require(resolve(__dirname, './../index'));

const {DIR} = require(resolve(__dirname, './../../../config/index'));
const Logs = require(resolve(__dirname, './../../../src/classes/logs'));
const logs = new Logs();
logs.setPath(DIR.LOGS).setPrefijo('SYS.MIDDLEWARE').setName(new Date(moment().format('MMM DD, YYYY')).getTime()/1000000).setFormato('xml');

module.exports.app = app;

['asset'].forEach(m => {
    const log = {
        'Route' : resolve(__dirname, `./${m}`),
        'State' : 'ERR',
        'Date' : moment().format('MMM DD, YYYY'),
        'Time' : moment().format('HH:mm:ss')
    };
    try {
        require(`./${m}`);
        log.State = 'OK';
        logs.addLog(log);
    } catch (error) {
        logs.addLog(log);
    }
});