# 搞着玩的命令行工具


## 安装
```shell
    npm install wg_tools -g
```

## 使用

翻译功能：
```shell
    // wg translate 翻译的单词/短语/句子(支持中英文)
    // 也可以使用wg t 命令
    wg translate 这是一个好的命令行工具

    // result:
    google:  This is a good command line tool
    baidu:  This is a good command line tool
    youdao:  This is a good command line tools

```

项目创建：
```shell
    // wg create <project-name>
    // 也可以使用wg c命令
```

启动服务：
```shell
    // wg server
    // 以当前目录启动一个静态服务。--port设置端口号 --path设置静态服务路径
```

## TODO

1. 集成git，做precommit的代码检查
2. 丰富模版类型（koa，vue）

