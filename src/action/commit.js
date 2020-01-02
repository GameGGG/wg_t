const path = require('path');
const fs = require('fs');
const simpleGit = require('simple-git');
const { log, chalkTheme } = require('./../util/utils.js');

async function getGitRootPath(curPath) {
    const files = fs.readdirSync(curPath);
    // 没有.git 向上查找
    if (!~files.indexOf('.git')) {
        const parentPath = path.join(curPath, '../');
        if (curPath !== parentPath) {
            return await getGitRootPath(parentPath);
        };
        return '';
    }
    return curPath;
}

async function gitWorker(git) {
    git.status((err, res) => {
        console.log(res);
    });
}

module.exports = async function(branch) {
    const workPath = await getGitRootPath(process.cwd());
    if (!workPath) {
        log('未找到git的工作目录');
        return;
    }
    log(workPath);
    await gitWorker(simpleGit(workPath));
}