const path = require('path');

const server = require('koa-static');
const koa = require('koa');
const app = new koa();

const { chalkTheme, log } = require('./../util/utils.js');

let staticPath = process.cwd();

function startServer(opt) {
    let port = opt.port || '8081';
    let targetPath = opt.path || './';
    if (targetPath.startsWith('/')) {
        staticPath = targetPath;
    }
    else {
        staticPath = path.join(staticPath, targetPath);
    }
    app.use(server(staticPath));
    app.listen(port, err => {
        if (err) {
            log(chalkTheme.error(err));
            return;
        }
        log(chalkTheme.pass(`启动服务: http://localhost:${port}`));
    });
}

module.exports = function(options) {
    startServer({
        path: options.path,
        port: options.port
    });
}