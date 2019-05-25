const path = require('path');
const fsExtra = require('fs-extra');
const createSimpleProject = require('./simple.js');
const { chalkTheme, log } = require('./../../util/utils.js');

const templatePath = path.join(__dirname, './template/express/');
async function copyFilesToCurDir(opt) {
    const targetPath = path.join(opt.dir, opt.name);
    try {
        await fsExtra.copy(templatePath, targetPath);
        await createSimpleProject.create({
            name: 'www',
            dir: targetPath
        });
        log(chalkTheme.pass(`
================================================

            cd ${opt.name}
            npm install
            npm run start / node index.js

================================================
        `));
    }
    catch (err) {
        log(chalkTheme.error(err));
    }
}
module.exports = {
    create: copyFilesToCurDir
}