/**
 * Created by garrettzhou@2018-9-1
 * babelrc 用于服务端和webpack的babel配置
 */
import fs from 'fs';
import path from 'path';

import ini from '../ini';

export default () =>
    ({
        presets: [['@babel/env', getPresetsOption()]] as any[],
        plugins: getPlugins()
    });

//#region 私有成员
const { NODE_ENV_VALUE, isProduction, isExpProduction, isTest, isLocalTest } = ini;

const getPresetsOption = () => ({ targets: { /* browsers: ['Chrome >= 60'] */ } });

const getPlugins = () => {
    let plugins: any[] = [];

    const env: dp.CustomProcessEnv = {
        RUN_ENV: process.env.RUN_ENV,

        APP_VERSION: process.env.APP_VERSION,

        NODE_ENV_VALUE,

        IS_PRODUCTION: isProduction,
        IS_EXP_PRODUCTION: isExpProduction,

        IS_TEST: isTest,
        IS_LOCAL_TEST: isLocalTest
    };

    const defineEnv = Object.keys(env).reduce<dp.Obj>((obj, key) => {
        obj[`process.env.${key}`] = (env as dp.Obj)[key];
        return obj;
    }, {});

    defineEnv['process.env.NODE_ENV'] = NODE_ENV_VALUE;

    plugins.push(['transform-define', defineEnv]);

    plugins.push('@babel/plugin-syntax-dynamic-import');

    const importList = ['my-local-web-helper'];
    const pathMap: dp.Obj<dp.Obj<string | undefined>> = {};
    const getPath = (library: string, name: string) => {
        if (!pathMap[library]) {
            pathMap[library] = {};
        }
        return pathMap[library][name];
    };
    const handlePathResult = (result: string | undefined, library: string, name: string) => {
        if (!result) {
            throw new Error(`${library} 下找不到 ${name}`);
        }

        pathMap[library][name] = result;
        return result;
    };
    plugins = plugins.concat(
        importList.map(item =>
            ['import', {
                libraryName: item,
                libraryDirectory: '',
                camel2DashComponentName: false
            }, item]
        ).concat([
            ['import', {
                libraryName: 'my-local-web-component',
                camel2DashComponentName: false,
                customName(name: string) {
                    const library = 'my-local-web-component';
                    let result = getPath(library, name);

                    if (result) return result;

                    const baseUrl = '../../web/react/component';
                    try {
                        require.resolve(`${baseUrl}/${name}`);
                        result = `${library}/${name}`;
                    } catch {
                        const realPath = path.join(__dirname, baseUrl);
                        const list = fs.readdirSync(realPath);
                        for (const file of list) {
                            try {
                                if (fs.statSync(`${realPath}/${file}`).isDirectory) {
                                    require.resolve(`${baseUrl}/${file}/${name}`);
                                    result = `${library}/${file}/${name}`;
                                }
                            } catch {

                            }
                        }
                    }
                    return handlePathResult(result, library, name);
                }
            }, 'my-local-web-component'],
            ['import', {
                libraryName: 'my-local-web-util',
                camel2DashComponentName: false,
                customName(name: string) {
                    const library = 'my-local-web-util';
                    let result = getPath(library, name);

                    if (result) return result;

                    try {
                        require.resolve(`../../web/util/${name}`);
                        result = `${library}/${name}`;
                    } catch {
                        result = `my-local-public-util/${name}`;
                    }
                    return handlePathResult(result, library, name);
                }
            }, 'my-local-web-util'],
            ['import', {
                libraryName: 'my-local-web-business',
                camel2DashComponentName: false,
                customName(name: string) {
                    const library = 'my-local-web-business';
                    let result = getPath(library, name);

                    if (result) return result;

                    try {
                        require.resolve(`../../web/business/${name}`);
                        result = `${library}/${name}`;
                    } catch {
                        result = `my-local-public-business/${name}`;
                    }
                    return handlePathResult(result, library, name);
                }
            }, 'my-local-web-business']
        ] as any));
    plugins.push('@babel/plugin-transform-runtime');

    if (isLocalTest) {
        plugins.push('react-hot-loader/babel');
    }

    return plugins;
};
//#endregion
