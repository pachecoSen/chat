"use strict";

const isEmpty = require('is-empty');

const {app} = require('./index');

app.use('/admin/', (req, res, next) => {
    const {token} = req.cookies;
    if(isEmpty(token))
        return res.redirect('/inicio');

    return next();
});