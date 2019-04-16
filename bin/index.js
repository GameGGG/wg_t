#!/usr/bin/env node
const { youdao, baidu, google } = require('translation.js');

async function translate(word) {
    console.log(word);
    const gr = await google.translate(word);
    const br = await baidu.translate(word);
    const yr = await youdao.translate(word);

    console.log('google: ', gr.result.join(' '));

    console.log('baidu: ', br.result.join(' '));
    
    console.log('youdao: ', yr.result.join(' '));
}


const word = process.argv.slice(2);

translate(word[0]);
