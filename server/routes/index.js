"use strict";

const {resolve} = require('path'),
    moment = require('moment');

const {DIR} = require(resolve(__dirname, './../../config/index'));

const epoch = require(resolve(__dirname, './../../src/helpers/epoch'));

const Logs = require(resolve(__dirname, './../../src/classes/logs'));
const logs = new Logs();
logs.setPath(DIR.LOGS).setPrefijo('SYS.ROUTE').setName(epoch(moment().format('MMM DD, YYYY'))).setFormato('xml');

module.exports = app => {
    module.exports.app = app;
    ['info', 'asset', 'admin', 'sysAdmin'].forEach(r => {
        const log = {
            'Route' : resolve(__dirname, `./${r}`),
            'State' : 'ERR',
            'Date' : moment().format('MMM DD, YYYY'),
            'Time' : moment().format('HH:mm:ss')
        };
        try {
            require(`./${r}`);
            log.State = 'OK';
            logs.addLog(log);
        } catch (error) {
            logs.addLog(log);
        }
    });
}