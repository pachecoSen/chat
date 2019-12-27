"use strict";

const isEmpty = require('is-empty'),
    {resolve} = require('path');

const {app} = require('./index');

const isEmptyArray = require(resolve(__dirname, './../../../src/helpers/isEmpty'));

const route = '/sys/admin/';

app.use('/admin/', (req, res, next) => {
    const {token} = req.cookies;
    if(isEmpty(token))
        return res.redirect('/inicio');

    return next();
});

app.use(`${route}login`, (req, res, next) => {
    const {email, password} = req.body;

    return !isEmptyArray([email, password]) ? res.json({'estado' : false, 'msg' : 'User or password error.'}) : next();
});