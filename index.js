"use strict";

const moment = require('moment'),
 {resolve} = require('path');

const {PORT} = require('./config'),
    server = require('./server/server');

const Logs = require('./src/classes/logs')

server.listen(PORT, err => {
    const logs = new Logs();
    logs.setPath(resolve(__dirname, './logs')).setPrefijo('SYS').setName(moment().unix());
    if (err){
        logs.addLog(`ERR:[${moment()}][${resolve(__dirname, __filename)}] - ${err}`);
        throw new Error(err);
    }

    logs.addLog(`OK:[${moment()}][${resolve(__dirname, __filename)}] - Server successfully started, on the port ${PORT}.`);
});