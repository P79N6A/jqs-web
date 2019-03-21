/**
 * Created by garrettzhou@2018-7-18
 * 安装项目必需的vscode extension
 */
const {
    exec,
    printf,
    ColorsEnum
} = require('./util');

const list = [{
    key: 'abelqjli.jce-plugin',
    name: 'jce-plugin'
}, {
    key: 'eg2.tslint',
    name: 'tslint'
}, {
    key: 'infarkt.css-to-jss',
    name: 'css-to-jss'
}];

printf('安装完成后，请手动重启vs code', ColorsEnum.CYAN);

list.forEach(item => {
    printf(`正在安装"${item.name}"...`, ColorsEnum.YELLOW);
    exec(`code --install-extension ${item.key}`);
});
