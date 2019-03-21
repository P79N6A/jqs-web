/**
 * Created by garrettzhou@2018-7-18
 * 清理git tag
 */
const {
    readline,
    exec
} = require('./util');

(async () => {
    const filterStr = await readline('请输入要清除的tag的关键字：');
    const tags = exec('git tag', false).split('\n').filter(item => item.indexOf(filterStr) >= 0);
    exec(`git push origin ${tags.map(item => `:refs/tags/${item}`).join(' ')}`);
    exec(`git tag -d ${tags.join(' ')}`);
})();
