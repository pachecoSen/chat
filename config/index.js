"use strict";

const {load:loadConfig} = require('node-yaml-config'),
    {resolve} = require('path');

const fileConfig = loadConfig(resolve(__dirname, './../config.yaml'));

module.exports = {
    'ENV' : fileConfig.ENTORNO,
    'PORT' : fileConfig.PORT,
    'DIR' : {
        'PUBLIC' : resolve(__dirname, './../public'),
        'VIEWS' : resolve(__dirname, './../server/views'),
        'LOGS' : resolve(__dirname, './../logs'),
        'ASSET' : {
            'JS' : resolve(__dirname, './../public/js'),
            'CSS' : resolve(__dirname, './../public/css')
        }
    },
    'DB' : {
        'HOST' : fileConfig.DATABASE.HOSTDB,
        'PORT' : fileConfig.DATABASE.PORTDB,
        'DATABASE' : fileConfig.DATABASE.NAMEDB,
        'USERNAME' : fileConfig.DATABASE.USER,
        'PASSWORD' : fileConfig.DATABASE.PASS
    }
}