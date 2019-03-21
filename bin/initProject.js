/**
 * Created by garrettzhou@2018-7-18
 * 初始化工程
 */
const {
    exec,
    printf,
    ColorsEnum
} = require('./util');

printf('请确认您安装了 Node v10 及以上版本', ColorsEnum.RED);
printf('请自行安装tslint等插件', ColorsEnum.RED);

const moduleList = [ /* 'webpack', 'webpack-cli', 'tslint', 'typescript', 'gulp' */ ];
let commonList = ['rimraf', 'sequelize-auto-xiaocaibird-fork', 'mysql', 'kill-port', 'cross-env', 'shx'];

const packageLock = require('../package-lock.json');
if (packageLock) {
    const devDep = packageLock.dependencies || {};
    for (const name of moduleList) {
        if (devDep[name]) {
            commonList.push(`${name}@${devDep[name].version}`);
        } else {
            commonList.push(name);
        }
    }
} else {
    commonList = commonList.concat(moduleList);
}

exec(`tnpm i -g ${commonList.join(' ')}`);
