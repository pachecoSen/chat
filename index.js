"use strict";

const moment = require('moment'),
    {resolve} = require('path');

const {PORT, DIR} = require('./config/index'),
    server = require('./server/server');

const epoch = require('./src/helpers/epoch');

const Logs = require('./src/classes/logs');
const logs = new Logs();
logs.setPath(DIR.LOGS).setPrefijo('SYS').setName(epoch(moment().format('MMM DD, YYYY'))).setFormato('TXT');

const filename = resolve(__dirname, __filename);

server.listen(PORT, err => {
    try {
        if (err){
            logs.addLog(`ERR:[${moment()}][${filename}] - ${err}`);
            throw new Error(err);
        }

        logs.addLog(`OK:[${moment()}][${filename}] - Server successfully started, on the port ${PORT}.`);
        try {
            module.exports.server = server;
            require('./server/socket');
            logs.addLog(`OK:[${moment()}][${filename}] - Socket.io server, started successfully.`);
            try {
                const {config:confDB, conn} = require('./server/db');
                logs.addLog(`OK:[${moment()}][${filename}] - Connection to the ${confDB.DataBase} database on the ${confDB.Host} server was successful.`);
            } catch (error) {
                logs.addLog(`ERR:[${moment()}][${filename}] - ${err}`);
            }
        } catch (error) {
            logs.addLog(`ERR:[${moment()}][${filename}] - ${err}`);
        }   
    } catch (error) {
        logs.addLog(`ERR:[${moment()}][${filename}] - ${error}`);
        console.log(error);
    }
});