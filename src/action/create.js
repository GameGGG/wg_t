const path = require('path');
const createSimple = require('./../lib/create/simple.js');
const templateType = {
    'simple': createSimple
}
function createTemplate(opt) {

    if (templateType[opt.type]) {
        templateType[opt.type].create(path.join(process.cwd(), opt.name));
    }
}
module.exports = function(name = 'project', options) {
    if (!options.type) {
        options.type = 'simple'
    }
    createTemplate({
        name,
        type:options.type
    });
}