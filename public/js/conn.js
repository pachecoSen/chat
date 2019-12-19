"use strict";

var socket = io();

socket.on('connect', function() {
    const indicador = document.getElementById("infoSocket").childNodes[1];
    if(!/text-success/g.test(indicador.className)){
        indicador.className = 'material-icons text-success';
        indicador.innerHTML = 'done';
    }
});

socket.on('disconnect', function() {
    const indicador = document.getElementById("infoSocket").childNodes[1];
    if(!/text-danger/g.test(indicador.className)){
        indicador.className = 'material-icons text-danger';
        indicador.innerHTML = 'highlight_off';
    }
});

socket.on('resConn', function(msg){
    console.log(msg);
});