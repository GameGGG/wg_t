#!/usr/bin/env node
let translateAction = require('./../src/action/translate.js');

console.log(process.argv);
console.log(process.argv.slice(2));
translateAction(process.argv.slice(2), {});