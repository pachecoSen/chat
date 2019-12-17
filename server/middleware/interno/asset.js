"use strict";

const {resolve} = require('path'),
    {existsSync, readFile, writeFileSync} = require('fs'),
    {minify} = require("uglify-es");

const {app} = require('./index');

const {ASSET} = require(resolve(__dirname, './../../../config/index')).DIR;

const route = '/asset/';

app.use(`${route}js/:file`, (req, res, next) => {
    let {file} = req.params;
    file = resolve(ASSET.JS, `${file}.js`);
    if(!existsSync(file))
        return res.status(404).end();

    if(existsSync(file.replace('.js','.min.js')))
        return next();

    readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        
        writeFileSync(file.replace('.js','.min.js'), minify(data).code, {'encoding' : 'utf8'});
        
        return next();
    });

    return false;
});