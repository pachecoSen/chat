"use strict";

const moment = require('moment'),
    {tmpdir} = require('os'),
    {mkdir, readFileSync, existsSync, writeFileSync, writeFile} = require('fs'),
    {resolve} = require('path'),
    builder = require('xmlbuilder'),
    {xml2js} = require('xml-js');

class Log{
    constructor(str_path = tmpdir()){
        this.prefijo = 'log_';
        this.name = moment().unix();
        this.formato = 'txt';
        this.path = str_path;
    }

    /**
     * @param {string} srt_prefijo
     */
    set Prefijo(srt_prefijo){
        this.prefijo = srt_prefijo;
    }

    /**
     * @param {string} srt_name
     */
    set Name(srt_name){
        this.name = srt_name;
    }

    /**
     * @param {string} srt_formato
     */
    set Formato(srt_formato){
        this.formato = srt_formato.toLowerCase();
    }

    /**
     * @param {string} str_path
     */
    set Path(str_path){
        this.path = str_path;
    }

    get Name(){
        return `${this.prefijo}${this.name}.${this.formato}`;
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
        this.formato = srt_formato.toLowerCase();

        return this;
    }

    setPath(str_path){
        this.path = str_path;
        mkdir(this.path, { recursive: true }, err => {
            if (err) throw err;
        });

        return this;
    }

    getName(){
        return `${this.prefijo}${this.name}.${this.formato}`;
    }

    mkLog(){
        const fileName = this.getName(), fecha = moment();
        const fileLog = resolve(this.path, fileName);
        const startTXT = `File: ${fileName} - ${fecha.format('MMM DD, YYYY')} - ${fecha.format('HH:mm:ss')}\n`;
        if(!existsSync(fileLog)){
            switch (this.formato) {
                case 'txt':
                    writeFileSync(fileLog, startTXT);
                    break;

                case 'xml':
                    let FileInfo = startTXT.split('-').map(e => e.replace('File:', '')).map(e => e.trim()), Log = {};
                    FileInfo = {
                        'File' : FileInfo[0],
                        'Date' : FileInfo[1],
                        'Time' : FileInfo[2]
                    };
                    FileInfo = builder.create('Logs', {encoding: 'utf-8'}).ele({FileInfo}).up().ele('Log').end({ pretty: true});
                    writeFileSync(fileLog, FileInfo);
                    break;
            
                default:
                    throw new Error(`[Log.mkLog] - Format error (${this.formato})`);
            }
        }

        return false;
    }

    save(str_log){
        const fileLog = resolve(this.path, this.getName());
        if(existsSync(fileLog)){
            switch (this.formato) {
                case 'txt':
                    const contenido = `${readFileSync(fileLog, 'utf8')}${str_log}\n`;
                    writeFileSync(fileLog, contenido);
                    break;

                case 'xml':
                    const old = xml2js(readFileSync(fileLog, 'utf8'), {compact: false});
                    let FileInfo = {};
                    old.elements[0].elements[0].elements.forEach(e => FileInfo[e.name] = e.elements[0].text);
                    FileInfo = builder.create('Logs', {encoding: 'utf-8'}).ele({FileInfo}).up().ele('Log');
                    FileInfo.ele('Route', {'file' : str_log.Route, 'Date' : str_log.Date, 'Time' : str_log.Time}, str_log.State)
                    FileInfo = FileInfo.end({ pretty: true});
                    writeFileSync(fileLog, FileInfo);
                    break;
            
                default:
                    throw new Error(`[Log.save] - Format error (${this.formato})`);
            }
        }

        return false;
    }

    addLog(str_log){
        this.mkLog();
        this.save(str_log);
    }
}

module.exports = Log;