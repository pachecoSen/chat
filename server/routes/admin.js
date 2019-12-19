"use strict";

const {app} = require('./index');

const route = '/admin/';

app.get([route, `${route}main`], (req, res, next) => {
    //Aqui quedo
});
