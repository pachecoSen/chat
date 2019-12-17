"use strict";

var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('resConn', function(msg){
    console.log(msg);
});