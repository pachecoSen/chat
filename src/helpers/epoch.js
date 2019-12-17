"use strict";

module.exports = str_fecha => Math.floor(new Date(str_fecha).getTime()/1000.0);