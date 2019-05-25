const path = require('path');
const { chalkTheme, log } = require('./../util/utils.js');
const createSimple = require('./../lib/create/simple.js');
const createExpress = require('./../lib/create/express.js');
const templateType = {
    'simple': createSimple,
    'express': createExpress
}
function createTemplate(opt) {
    if (templateType[opt.type]) {
        templateType[opt.type].create({
            name: opt.name,
            dir: opt.dir
        })
            .then(() => {
                log('done.');
            });
    }
}
module.exports = function(name = 'project', options) {
    if (!options.type) {
        options.type = 'simple'
    }
    createTemplate({
        name,
        dir: process.cwd(),
        type:options.type
    });
}