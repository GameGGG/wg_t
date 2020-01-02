const path = require('path');
const fs = require('fs');

const simpleGit = require('simple-git');
const inquirer = require('inquirer');

const { YesOrNo } = require('./../util/question.js');
const { log, chalkTheme, creatorAsyncFunc } = require('./../util/utils.js');

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
        if (statusOpt.files.length > 0 && await YesOrNo('你是否stash当前分支的修改?')) {
            await gitStashSave();
        }
        // 切换分支
        await gitCheckoutBranch(branch)
        // 检查切换的分支是否有stash
        let list = await getCurrentBranchStash();
        if (list.length > 0 && await YesOrNo('检查到当前分支有自动stash保存，是否pop？')) {
            await gitStashPop(`stash@{${list[0].index}}`);
            console.log('hava fun!')
        }
    }
    catch (e) {
        log(chalkTheme.error(JSON.stringify(e)));
    }
}

async function gitStashPop(stash) {
    return new Promise((resolve, reject) => {
        git.stash(['pop', stash], (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res)
        })
    });
}


const stashMessage = "[wg] auto save in checkout branch!";
async function gitStashSave() {
    return new Promise((resolve, reject) => {
        git.stash('save', {"-m": stashMessage, "-u": true}, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res)
        })
    });
}

async function getCurrentBranch() {
    return new Promise((resolve, reject) => {
        git.branchLocal((err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.current);
        });
    });
}

async function getCurrentBranchStash() {
    const curBranch = await getCurrentBranch();
    return new Promise((resolve, reject) => {
        git.stashList((err, res) => {
            if (err) {
                reject(err);
                return;
            }
            const stashList = res.all || [];
            const currentBranchForStash = stashList.map((item, index) => {
                if (!!~item.message.indexOf(`${curBranch}: =${stashMessage}`)) {
                    return {
                        message: item.message,
                        index: index,
                        hash: item.hash
                    }
                }
            }).filter(item => item);
            resolve(currentBranchForStash);
        });
    });
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