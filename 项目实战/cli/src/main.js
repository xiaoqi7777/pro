
import program from 'commander';
import {VERSION} from './utils/constants';
import main from './index';
//zf-cli config srt a
//zf-cli install

let actionMap = {
  install:{
    alias:'i',
    description:'install template',
    examples:[
      'sg-cli i',
      'sg-cli install'
    ]
  },
  config:{
    alias:'c',
    description:'config .sgclirc',
    examples:[
      'sg config set <k> <v>',
      'zf-cli config get <k>',
      'zf-cli config remove <k>',
    ]
  },
  '*':{
    description:'not found',
    examples:[]
  }
}
Object.keys(actionMap).forEach(action => {
  program.command(action)
  .description(actionMap[action].description)
  .alias(actionMap[action].alias)
  .action(()=>{
    // 判断一下当前用的什么操作
    if(action === 'config'){
      // 实现可以更改配置文件
      main(action,process.argv.slice(3))
    }else if(action === 'install'){
      main()
    }
  })
})

function help(){
  Object.keys(actionMap).forEach(action => {
    actionMap[action].examples.forEach(example => {
      console.log(example)
    })
  })
}

// 监听命名 执行help函数
program.on('-h',help)
program.on('--help',help)

program.version(VERSION,'-v -version').parse(process.argv)