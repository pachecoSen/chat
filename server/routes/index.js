"use strict";

const {resolve} = require('path'),
    moment = require('moment');

const Logs = require(resolve(__dirname, './../../src/classes/logs'));

const logs = new Logs();
logs.setPath(resolve(__dirname, './../../logs')).setPrefijo('SYS.ROUTE').setName(moment().unix()).setFormato('xml');

module.exports = app => {
    module.exports.app = app;
    ['info'].forEach(r => {
        try {
            require(`./${r}`);
            logs.addLog();
        } catch (error) {
            console.log(error);
        }
    });
}