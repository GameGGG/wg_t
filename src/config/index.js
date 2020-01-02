const path = require('path');
module.exports = [
    // {
    //     command: 'translate [words...]',
    //     alias: 't',
    //     description: '翻译',
    //     actionModule: 'translate',
    //     options: [
    //         {
    //             argv: '-h, --help',
    //             des: '翻译，使用translate模块进行翻译，帮助在命令行直接简单翻译'
    //         },
    //         {
    //             argv: '-s, --search',
    //             des: '在网页中搜索查找结果'
    //         }
    //     ]
    // },
    {
        command: 'create [name]',
        alias: 'c',
        description: '创建新项目',
        actionModule: 'create',
        options: [
            {
                argv: '-t, --type <type>',
                des: '新建项目类型'
            }
        ]
    },
    {
        command: 'commit [branch]',
        description: '提交项目',
        actionModule: 'commit'
    },
    {
        command: 'checkout [branch]',
        alias: 'ck',
        description: '切换分支',
        actionModule: 'checkout'
    }
]