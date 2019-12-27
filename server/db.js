"use strict";

const mysqlx = require('@mysql/xdevapi'),
    {resolve} = require('path');

const {DB} = require(resolve(__dirname, './../config/index'));

module.exports.config = {
    'Host' : DB.HOST,
    'DataBase' : DB.DATABASE
};

module.exports.conn = mysqlx.getSession({
    'user': DB.USERNAME,
    'password': DB.PASSWORD,
    'host': DB.HOST,
    'port': DB.PORT
}).getSchema(DB.DATABASE);