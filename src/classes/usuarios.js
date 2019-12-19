"use strict";

class Usuarios{
    constructor(){
        this.personas = [];
    }

    addPersona(id, nombre){
        this.personas.push({id, nombre});

        return this;
    }

    getPersona(id){
        const persona = this.personas.filter(p => p.id === id);

        return persona[0];
    }

    getPersonas(){
        return this.personas;
    }

    delPersona(id){
        const persona = this.getPersona(id);
        this.personas = this.personas.filter(p => p.id !== id);

        return persona;
    }
}

module.exports = Usuarios;