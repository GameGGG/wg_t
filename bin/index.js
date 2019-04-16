#!/usr/bin/env node
const axios = require('axios');
const _axios = axios.create({
    headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'}
});

const word = process.argv.slice(2);
const baiduApi = 'https://fanyi.baidu.com/transapi';
const youdaoApi = 'http://fanyi.youdao.com/translate';
_axios.get(`${youdaoApi}?&doctype=json&type=ZH_CH2EN&i=${encodeURIComponent(word)}`).then(res => {
    if (res.status === 200 && res.data.errorCode === 0) {
        console.log('有道结果: ',res.data.translateResult[0][0].tgt);
    }
});
_axios.get(`${baiduApi}?&from=auto&to=en&query=${encodeURIComponent(word)}`).then(res => {
    if (res.status === 200 && res.data.status === 0) {
        console.log('百度结果: ',res.data.data[0].dst);
    }
})
