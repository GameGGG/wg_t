const path = require('path');
const fs = require('fs');

const simpleGit = require('simple-git');
const inquirer = require('inquirer');

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

async function gitWorker(branch) {
    // 检查当前分支是否干净
    try {
        let statusOpt = await checkBranchIsClear()
        if (statusOpt.files.length > 0) {
            const prompt = inquirer.createPromptModule();
            let userAnswer = await prompt({
                type: 'list',
                name: 'isStash',
                message: '你是否stash当前分支的修改?',
                choices: ['yes', 'no']
            });
            if (userAnswer.isStash === 'yes') {
                // stash修改
                await gitStash('save');
            }
        }
        // 切换分支
        await gitCheckoutBranch(branch)
        // 检查切换的分支是否有stash
        git.stash('list', (err, res) => {
            console.log(res);
        })
        return
        let stashResult = await gitStash('list');
        console.log('stash list:', stashResult);
    }
    catch (e) {
        log(chalkTheme.error(JSON.stringify(e)));
    }
}
async function gitStash(command) {
    return new Promise((resolve, reject) => {
        git.stash(command, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
async function gitCheckoutBranch(branch) {
    return new Promise((resolve, reject) => {
        git.checkout(branch, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
async function checkBranchIsClear() {
    return new Promise((resolve, reject) => {
        git.status((err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}

let git;
module.exports = async function(branch) {
    const workPath = await getGitRootPath(process.cwd());
    if (!workPath) {
        log('未找到git的工作目录');
        return;
    }
    git = simpleGit(workPath);
    await gitWorker(branch);
}