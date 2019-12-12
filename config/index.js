"use strict";

const {load:loadConfig} = require('node-yaml-config'),
    {resolve} = require('path');

const fileConfig = loadConfig(resolve(__dirname, './../config.yaml'));

module.exports = {
    'PORT' : fileConfig.PORT,
    'DIR' : {
        'PUBLIC' : resolve(__dirname, './../public')
    }
}