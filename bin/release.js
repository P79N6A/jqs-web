/**
 * Created by garrettzhou@2018-7-18
 * 发布
 */
const {
    printf,
    ColorsEnum,
    readline,
    exec,
    execAndGetDetails
} = require('./util');
(async () => {
    const nowBranch = exec('git symbolic-ref --short -q HEAD', false);
    let newBranch = '';

    try {
        printf('即将发布origin/master分支，发布成功后自动切换回当前工作分支，有未提交的修改会自动stash', ColorsEnum.CYAN);
        const otherReleaseBranch = await readline('若要附带其它分支请输入分支名，多个分支用空格分割:');

        exec('git stash');
        exec('git branch -D release');
        exec('git checkout -b release origin/release');
        exec('git pull');

        const time = (() => {
            const nowDate = new Date();
            const year = nowDate.getFullYear().toString().slice(2);
            const month = nowDate.getMonth() + 1;

            return `${year}${month < 10 ? `0${month}` : month}`;
        })();

        const num = await readline('请输入当前迭代编号(1 or 2):');

        if (num !== '1' && num !== '2') {
            printf('迭代编号输入错误', ColorsEnum.RED);
            exec(`git checkout ${nowBranch}`);
            process.exit();

            return;
        }

        const nowTags = exec(`git tag -l "${time}V${num}-*"`, false);

        if (nowTags) {
            printf('<---当前迭代的tag--->', ColorsEnum.CYAN);
            exec(`git tag -l "${time}V${num}-*"`);
            printf('<---当前迭代的tag--->', ColorsEnum.CYAN);
        }

        const version = await readline('请输入tag版本号(如:1.x，2.x，beta1.x):');

        if (!version) {
            printf('tag版本号不能为空！', ColorsEnum.RED);
            exec(`git checkout ${nowBranch}`);
            process.exit();

            return;
        }

        const tag = `${time}V${num}-${version}`;

        printf(`tagName=${tag}`, ColorsEnum.CYAN);

        if (otherReleaseBranch) {
            newBranch = `release-${tag}`;
            printf(`由于此次发布包含除master外的其它分支，即将生成${newBranch}来完成此次发布！`, ColorsEnum.CYAN);
            exec(`git checkout -b ${newBranch}`);
        }

        const result = execAndGetDetails(`git merge origin/master ${otherReleaseBranch} -m 合并生成${tag} &&
          npm run build &&
          git add . &&
          git commit -m ${tag} &&
          git tag -a ${tag} -m ${tag} &&
          git push &&
          git push origin ${tag} && will complete...`);

        if (result.code === 0 || result.code === 128 || result.code === 127) {
            const buildLog = require('../.log/build.json');
            printf('');
            printf(`tagName: ${tag}`, ColorsEnum.GREEN);
            printf(`version: ${buildLog.version}`, ColorsEnum.GREEN);
        } else {
            printf(`exit code: ${result.code}`, ColorsEnum.RED);
        }
    } catch (e) {

    } finally {
        exec(`git checkout ${nowBranch}`);
        if (newBranch) {
            exec(`git branch -D ${newBranch}`);
        }
        process.exit();
    }
})();
