"use strict";

const {app} = require('./index');

const route = '/admin/';

app.get([route, `${route}main`], (req, res, next) => {
    const title = "CHAT Base - Admin";

    return res.render('./admin/index', {title});
});

app.get('/inicio', (req, res) => {
    const title = "CHAT Base - Admin | Inicio de Sesion",
        noMenu = true;

    return res.render('./admin/inicio', {title, noMenu});
});