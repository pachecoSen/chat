"use strict";

const moment = require('moment'),
    {tmpdir} = require('os'),
    {mkdir, readFileSync, existsSync, writeFileSync, writeFile} = require('fs'),
    {resolve} = require('path');

class Log{
    constructor(str_path = tmpdir()){
        this.prefijo = 'log_';
        this.name = moment().unix();
        this.formato = 'txt';
        this.path = str_path;
    }

    set Prefijo(srt_prefijo){
        this.prefijo = srt_prefijo;
    }

    set Name(srt_name){
        this.name = srt_name;
    }

    set Formato(srt_formato){
        this.formato = srt_formato;
    }

    set Path(str_path){
        this.path = str_path;
    }

    setPrefijo(srt_prefijo){
        this.prefijo = srt_prefijo;

        return this;
    }

    setName(srt_name){
        this.name = srt_name;

        return this;
    }

    setFormato(srt_formato){
        this.formato = srt_formato;

        return this;
    }

    setPath(str_path){
        this.path = str_path;
        mkdir(this.path, { recursive: true }, err => {
            if (err) throw err;
        });

        return this;
    }

    addLog(str_log){
        const fileName = `${this.prefijo}${this.name}.${this.formato}`,
            fecha = moment();
        const fileLog = resolve(this.path, fileName);
        if(!existsSync(fileLog))
            writeFileSync(fileLog, `File: ${fileName} - ${fecha.format('MMM DD, YYYY')} - ${fecha.format('HH:mm:ss')}\n`)

        let contenido = readFileSync(fileLog, 'utf8');
        contenido = `${contenido}${str_log}\n`;
        writeFile(fileLog, contenido, err => {
            if (err) throw err;
        });
    }
}

module.exports = Log;