"use strict";

const { app } = require('./index');

app.get('/info', (req, res) => {
    const msg = {
        'APP' : 'Chat base',
        'Version' : 'v.1.0.0'
    }

    return res.json(msg).end();
});