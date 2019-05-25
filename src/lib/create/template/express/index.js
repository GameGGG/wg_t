const express = require('express')
const app = express()
const PORT = '8088';

// 静态根目录为www目录
app.use('/', express.static('www'))

// 开启8088端口号的监听
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`http://127.0.0.1:${PORT}`);
});
