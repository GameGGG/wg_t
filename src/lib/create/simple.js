const path = require('path');
const fsExtra = require('fs-extra');
const { chalkTheme, log } = require('./../../util/utils.js');

const templatePath = path.join(__dirname, './template/simple/');
async function copyFilesToCurDir(opt) {
    const targetPath = path.join(opt.dir, opt.name);
    try {
        await fsExtra.copy(templatePath, targetPath);
    }
    catch (err) {
        log(chalkTheme.error(err));
    }
}
module.exports = {
    create: copyFilesToCurDir
}