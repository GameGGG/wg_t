# 搞着玩的命令行工具


## 安装
```shell
    npm install wg_tools -g
```

## 使用

项目创建：
```shell
    // 也可以使用wg c命令
    wg create <project-name>
```

启动服务：
```shell
    // 以当前目录启动一个静态服务。--port设置端口号 --path设置静态服务路径
    wg server
```

分支切换：检查当前分支是否有变动，让checkout更丝滑
```shell
    // 别名可以使用 wg ck branch-name
    wg checkout branch-name
```

## TODO

1. git commit提交信息格式化
3. 丰富模版类型（koa，vue）

