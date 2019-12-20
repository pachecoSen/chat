"use strict";

const {resolve} = require('path');

const {app} = require('./index');

const {ENV, DIR} = require(resolve(__dirname, './../../config/index'));

const route = '/asset/';

app.get(`${route}:env(js|css)/:file`, (req, res) => {
    let {file, env} = req.params;
    file = resolve(DIR.ASSET['js' === env ? 'JS' : 'CSS'], `${file}${'pro' === ENV ? '.min' : ''}.${'js' === env ? 'js' : 'css'}`);
    
    return res.status(200).download(file, `${file}.${'js' === env ? 'js' : 'css'}`);
});