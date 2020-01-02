const open = require('open');
const { chalkTheme, styles } = require('./../util/utils.js');
const reptileTrans = require('./../lib/reptile/index.js');

async function translate(word, options) {
    if (!word) {
        console.log('请输入内容');
        return;
    }
    let br;
    try {
        const transResult = await reptileTrans(word);
        br = transResult.baidu;
    }
    catch (e) {
        br = chalkTheme.error(e);
    }

    console.log('baidu: ', chalkTheme.pass(br));

    if (options.search) {
        let baseUrl = 'https://www.baidu.com/s?w=';
        let questionUrl = `${baseUrl}${encodeURIComponent(word)}`;
        console.log(chalkTheme.pass(styles.line));
        open(questionUrl).then(() => {
            console.log(chalkTheme.pass(`请前往浏览器查看结果`));
            console.log(chalkTheme.pass(styles.line));
        }).catch(err => {
            console.log(chalkTheme.warn(`打开浏览器失败，请复制链接到浏览器中：${questionUrl}`));
            console.log(chalkTheme.pass(styles.line));
        });
    }
}



module.exports = function(words, options) {
    let transStr = words.join(' ').trim();
    transStr && translate(transStr, options);
}