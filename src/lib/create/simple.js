const path = require('path');
const fsExtra = require('fs-extra');
const { chalkTheme } = require('./../../util/utils.js');

const templatePath = path.join(__dirname, './template/simple/');
function copyFilesToCurDir(targetPath) {
    console.log(targetPath);
    fsExtra.copy(templatePath, targetPath)
        .then(res => {
            console.log(chalkTheme.pass('项目创建成功'));
        })
        .catch(err => {
            console.log(err);
        });
}
module.exports = {
    create: copyFilesToCurDir
}