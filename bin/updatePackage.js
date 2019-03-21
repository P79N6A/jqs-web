/**
 * Created by garrettzhou@2018-7-18
 * 将依赖更新到最新版本
 */
const {
    exec
} = require('./util');

let isSync = false;

for (const arg of process.argv) {
    if (arg === '-s' || arg === '--sync') {
        isSync = true;
        break;
    }
}

const getVersionCode = versionStr => versionStr.trim().indexOf('^') === 0 ? versionStr.slice(1) : versionStr;

// 锁版本的list
let lockList = ['bowser'];

// 更新dependencies
const dependencies = require('../package.json').dependencies;
let packList = Object.keys(dependencies).filter(item => lockList.indexOf(item) === -1);

if (isSync) {
    exec(`tnpm sync ${packList.join(' ')}`);
}
exec(`tnpm i --save --needlock ${packList.join('@latest ')}@latest ${lockList.map(item => `${item}@${getVersionCode(dependencies[item])}`).join(' ')}`);

// 更新devDependencies
lockList = ['gulp', 'typescript'];

const devDependencies = require('../package.json').devDependencies;
packList = Object.keys(devDependencies).filter(item => lockList.indexOf(item) === -1);

if (isSync) {
    exec(`tnpm sync ${packList.join(' ')}`);
}
exec(`tnpm i --save-dev --needlock ${packList.join('@latest ')}@latest ${lockList.map(item => `${item}@${getVersionCode(devDependencies[item])}`).join(' ')}`);
