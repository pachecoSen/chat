"use strict";

const formulario = document.getElementById("formInicio");

formulario.onsubmit=async function(e){
    e.preventDefault();
    const body = new FormData(formulario),
        action = formulario.getAttribute('action'),
        method = formulario.getAttribute('method');
    
    const result = await fetch(action, {method, body});
    if(result.ok){
        const res = await result.json();
        if(!res.estado){
            document.getElementById("mTitle1").innerHTML = "Error de autenticacion";
            document.getElementById("mBody1").innerHTML = res.msg;
            $("#mErr").modal('show');

            return false;
        }
        
        return false;
    }
    
    console.log('Error');

    return false;
}