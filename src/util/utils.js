const chalk = require('chalk');

exports.chalkTheme = {
    pass: chalk.green,
    error: chalk.bold.red,
    warn: chalk.keyword('orange')
}

exports.styles = {
    sortLine: '======',
    line: '================'
}

exports.log = console.log;