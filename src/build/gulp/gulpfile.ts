/**
 * Created by garrettzhou@2018-9-1
 * gulpfile 用于gulp任务的配置，项目构建的入口
 */
import fs from 'fs';
import gulp from 'gulp';
import babel from 'gulp-babel';
import uuid from 'uuid';

import getBabelrc from '../babel/babelrc';
import ini from '../ini';

const { isTest, isLocalTest } = ini;

process.env.APP_VERSION = uuid.v4().replace(/-/g, '');
if (!fs.existsSync('../../../.log')) {
    fs.mkdirSync('../../../.log');
}
fs.writeFileSync('../../../.log/build.json', JSON.stringify({ version: process.env.APP_VERSION }, null, 2));

gulp.task('dist', () => {
    const files = [
        '../../../.tsc/**/*.js',
        '!../../../.tsc/build/gulp/**/*.js'];

    if (!isLocalTest) {
        files.push('!../../../.tsc/build/local/**/*.js');
    }
    if (!isTest) {
        files.push('!../../../.tsc/build/test/**/*.js');
    }
    gulp.src(files)
        .pipe(babel(getBabelrc()))
        .pipe(gulp.dest('../../../dist/'));
});
