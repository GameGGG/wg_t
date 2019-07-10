#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const program = require('commander');
const config = require('./../src/config');
const actionPath = './../src/action/';

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')));
const VERSION = packageJson.version;

program.version(VERSION, '-v, --version');
config.forEach(item => {
    const subProgram = program.command(item.command);
    // alias必须在action之前，否则会报错(action先执行)
    if (item.alias) {
        subProgram.alias(item.alias);
    }
    subProgram.action(require(path.join(actionPath, item.actionModule)));
    if (item.description) {
        subProgram.description(item.description);
    }
    if (item.options) {
        item.options.forEach(subItem => {
            subProgram.option(subItem.argv, subItem.des);
        });
    }
});


program.parse(process.argv);