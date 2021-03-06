"use strict";

const {resolve} = require('path'),
    moment = require('moment');

const {DIR} = require(resolve(__dirname, './../../config/index'));

const epoch = require(resolve(__dirname, './../../src/helpers/epoch'));

const Logs = require(resolve(__dirname, './../../src/classes/logs'));
const logs = new Logs();
logs.setPath(DIR.LOGS).setPrefijo('SYS').setName(epoch(moment().format('MMM DD, YYYY'))).setFormato('TXT');

try {
    const express = require('express'),
    cors = require('cors'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    {json} = require('body-parser'),
    cookieParser = require('cookie-parser'),
    multer = require('multer');

    module.exports = app => {
        app.set('views', DIR.VIEWS);
        app.set('view engine', 'pug');
        app.use(express.static(DIR.PUBLIC));
        app.use(cors());
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
            next();
        });
        app.use(helmet());
        app.use(morgan('dev'));
        app.use(json());
        app.use(multer().array());
        app.use(cookieParser());
        
        module.exports.app = app;
        require('./interno/index');
    }   
} catch (error) {
    logs.addLog(`ERR:[${moment()}][${resolve(__dirname, __filename)}] - ${error}`);
}