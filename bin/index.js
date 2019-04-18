#!/usr/bin/env node
const open = require('open');
const { youdao, baidu, google } = require('translation.js');
const urlRex = /^((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-\_]+)+([\w\-\.,@?\^=%&amp;:/~\+#]*[\w\-\@?\^=%&amp;/~\+#])?/

async function translate(word) {
    if (!word) {
        console.log('请输入内容');
        return;
    }

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

    const gr = await google.translate(word);
    const br = await baidu.translate(word);
    const yr = await youdao.translate(word);

    console.log('google: ', gr.result.join(' '));

    console.log('baidu: ', br.result.join(' '));
    
    console.log('youdao: ', yr.result.join(' '));
}


const word = process.argv.slice(2);

translate(word[0]);
