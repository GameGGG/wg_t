const path = require('path');
module.exports = [
    {
        command: 'trans [words...]',
        alias: 't',
        description: '翻译',
        actionModule: 'translate',
        options: [
            {
                argv: '-h, --help',
                des: '翻译，使用translate模块进行翻译，帮助在命令行直接简单翻译'
            }
        ]
    }
]