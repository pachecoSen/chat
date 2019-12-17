"use strict";

const {resolve} = require('path'),
    {existsSync, readFile, writeFileSync} = require('fs'),
    {minify} = require("uglify-es");

const {app} = require('./index');

const {ENV, DIR} = require(resolve(__dirname, './../../../config/index'));

const route = '/asset/';

app.use(`${route}:env(js|css)/:file`, (req, res, next) => {
    let {file, env} = req.params;
    file = resolve(DIR.ASSET['js' === env ? 'JS' : 'CSS'], `${file}.${'js' === env ? 'js' : 'css'}`);
    if(!existsSync(file))
        return res.status(404).end();
    
    if('pro' === ENV){
        if(existsSync(file.replace(`.${'js' === env ? 'js' : 'css'}`,`.min.${'js' === env ? 'js' : 'css'}`)))
            return next();

        readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            
            writeFileSync(file.replace(`.${'js' === env ? 'js' : 'css'}`,`.min.${'js' === env ? 'js' : 'css'}`), minify(data).code, {'encoding' : 'utf8'});
            
            return next();
        });

        return false;
    }

    return next();
});