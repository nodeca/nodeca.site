'use strict';

exports.root = __dirname;
exports.name = 'nodeca.site';
exports.init = function (N) { require('./lib/autoload.js')(N); };
