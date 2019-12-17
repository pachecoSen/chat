"use strict";

const {resolve} = require('path');

const {io} = require(resolve(__dirname, './../socket'));

io.on('connection', cliente => {
    console.log('Cliente conectado');
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    cliente.emit('resConn', {
        'msg': 'Bienvenido',
        'info': {
            'APP' : 'Chat base',
            'Version' : 'v.1.0.0'
        }
    });
});