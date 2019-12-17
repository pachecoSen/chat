"use strict";

const {resolve} = require('path');

const { app } = require('./index');

const {ASSET} = require(resolve(__dirname, './../../config/index')).DIR;

const route = '/asset/';

app.get(`${route}js/:file`, (req, res) => {
    let {file} = req.params;
    file = resolve(ASSET.JS, `${file}.min.js`);
    
    return res.status(200).download(file, 'conn.js');
});