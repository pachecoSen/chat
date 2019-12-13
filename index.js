"use strict";

const moment = require('moment'),
    {resolve} = require('path');

const {PORT} = require('./config'),
    server = require('./server/server');

const Logs = require('./src/classes/logs');

server.listen(PORT, err => {
    try {
        const logs = new Logs();
        logs.setPath(resolve(__dirname, './logs')).setPrefijo('SYS').setName(moment().unix()).setFormato('TXT');
        if (err){
            logs.addLog(`ERR:[${moment()}][${resolve(__dirname, __filename)}] - ${err}`);
            throw new Error(err);
        }

        logs.addLog(`OK:[${moment()}][${resolve(__dirname, __filename)}] - Server successfully started, on the port ${PORT}.`);
        try {
            module.exports.io = server;
            require('./server/socket');
            logs.addLog(`OK:[${moment()}][${resolve(__dirname, __filename)}] - Socket.io server, started successfully.`);
        } catch (error) {
            logs.addLog(`ERR:[${moment()}][${resolve(__dirname, __filename)}] - ${err}`);
        }   
    } catch (error) {
        console.log(error);
    }
});