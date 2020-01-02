const puppeteer = require('puppeteer');

async function reptile_baidu (word) {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch();

        let timeoutTimer = setTimeout(async () => {
            reject('查询超时, 请重试...');
            await browser.close();
        }, 10000);

        const page = await browser.newPage();
        await page.goto('https://fanyi.baidu.com/?aldtype=85#zh/en/' + decodeURI(word));
        page.once('load', async () => {
            setTimeout(async () => {
                // 获取dom中的元素
                try {
                    const targetDom = await page.$('.target-output');
                    const content = await targetDom.$eval('span', node => node.innerText);
                    resolve(content);
                }
                catch (e) {
                    reject(e);
                }
                finally {
                    clearTimeout(timeoutTimer);
                    await browser.close();
                }
            }, 1000);
        });
    });
}


module.exports = async function(word) {
    let baiduResult = await reptile_baidu(word);
    return {
        baidu: baiduResult
    }
}