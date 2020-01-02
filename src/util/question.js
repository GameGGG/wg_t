const inquirer = require('inquirer');


const Choices = async (question = '对或者错？', choices = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const prompt = inquirer.createPromptModule();
            let userAnswer = await prompt({
                type: 'list',
                name: 'isStash',
                message: question,
                choices: choices
            });
            resolve(userAnswer.isStash);
        }
        catch (e) {
            reject(e);
        }
    });
}

const YesOrNo = async (question) => {
    const result = await Choices(question, ['yes', 'no']);
    return result === 'yes';
}

module.exports = {
    Choices,
    YesOrNo
}