#!/usr/bin/env node
const open = require('open');
const { youdao, baidu, google } = require('translation.js');
const urlRex = /^((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-\_]+)+([\w\-\.,@?\^=%&amp;:/~\+#]*[\w\-\@?\^=%&amp;/~\+#])?/

async function translate(word) {
    if (!word) {
        console.log('请输入内容');
        return;
    }


    const gr = await google.translate(word);
    const br = await baidu.translate(word);
    const yr = await youdao.translate(word);

    console.log('google: ', gr.result.join(' '));

    console.log('baidu: ', br.result.join(' '));
    
    console.log('youdao: ', yr.result.join(' '));
}


const word = process.argv.slice(2);


// 检测是否是本地文件或者是网址
if (urlRex.test(word)) {
    if (!/^(http|https|ftp):\/\//.word) {
        word = `http://${word}`;
    }
    open(word).then(res => {
        console.log(`已打开网址：${word}`);
    }).catch(err => {
        console.log('打开网址失败');
    });
    return;
};
if (word[0] === '?') {
    let baseUrl = 'https://www.baidu.com/s?w=';
    let questionUrl = `${baseUrl}${encodeURIComponent(word.slice(1).join(' '))}`;
    open(questionUrl).then(res => {
        console.log(`请前往浏览器查看结果`);
    }).catch(err => {
        console.log(`打开浏览器失败，请复制链接到浏览器中：${questionUrl}`);
    });
    return;
}
let str = word.join(' ');
translate(str);
