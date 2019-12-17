"use strict";

const {load:loadConfig} = require('node-yaml-config'),
    {resolve} = require('path');

const fileConfig = loadConfig(resolve(__dirname, './../config.yaml'));

module.exports = {
    'ENV' : fileConfig.ENTORNO,
    'PORT' : fileConfig.PORT,
    'DIR' : {
        'PUBLIC' : resolve(__dirname, './../public'),
        'LOGS' : resolve(__dirname, './../logs'),
        'ASSET' : {
            'JS' : resolve(__dirname, './../public/js'),
            'CSS' : resolve(__dirname, './../public/css')
        }
    }
}