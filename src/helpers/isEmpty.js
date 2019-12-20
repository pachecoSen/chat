"use strict";

const isEmpty = require('is-empty');

module.exports = elementos => elementos.length === elementos.filter(e => !isEmpty(e.trim())).length;