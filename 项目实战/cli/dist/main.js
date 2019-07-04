"use strict";

require("core-js/modules/web.dom.iterable");

var _commander = _interopRequireDefault(require("commander"));

var _constants = require("./utils/constants");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//zf-cli config srt a
//zf-cli install
let actionMap = {
  install: {
    alias: 'i',
    description: 'install template',
    examples: ['sg-cli i', 'sg-cli install']
  },
  config: {
    alias: 'c',
    description: 'config .sgclirc',
    examples: ['sg config set <k> <v>', 'zf-cli config get <k>', 'zf-cli config remove <k>']
  },
  '*': {
    description: 'not found',
    examples: []
  }
};
Object.keys(actionMap).forEach(action => {
  _commander.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
    // 判断一下当前用的什么操作
    if (action === 'config') {
      // 实现可以更改配置文件
      (0, _index.default)(action, process.argv.slice(3));
    } else if (action === 'install') {
      (0, _index.default)();
    }
  });
});

function help() {
  Object.keys(actionMap).forEach(action => {
    actionMap[action].examples.forEach(example => {
      console.log(example);
    });
  });
} // 监听命名 执行help函数


_commander.default.on('-h', help);

_commander.default.on('--help', help);

_commander.default.version(_constants.VERSION, '-v -version').parse(process.argv);