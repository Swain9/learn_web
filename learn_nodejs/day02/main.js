//使用模块名导入,优先查找核心模块,如果没有
//就在node_modules文件夹中查找
const log1 = require('modules_test');
log1.log('你好', '我是', '你爹');

//使用相对路径导入
const log2 = require('./modules_test');
log2.log('你好', '我是', '你爹');

//使用文件夹导入,会默认寻找index.js文件
const log3 = require('./modulestest');
log3.log('你好', '我是', '你爹');

//使用文件夹导入,指定入口文件
const log4 = require('./modules_test_package');
log4.log('你好', '我是', '你爹');

//nodejs,使用类
const User1 = require('./class_test/UserClass1');
console.log(User1);
let user1 = new User1.User({name: '张三', age: 10});
user1.say();

//使用module.exports
const User = require('./class_test/UserClass2');
console.log(User);
let user2 = new User({name: '李四', age: 18});
user2.say();

