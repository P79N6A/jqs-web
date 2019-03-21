/**
 * Created by garrettzhou@2018-7-30
 * webpack配置文件
 */
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import cssnano from 'cssnano';
import path from 'path';
import createTransformer from 'ts-import-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import config from '../../public/config';
import getBabelrc from '../babel/babelrc';
import ini from '../ini';

const tsConfig = 'tsconfig.webpack.json';

export default (): Webpack.Configuration =>
    ({
        mode: getMode(),
        entry: getEntry(),
        output: getOutput(),
        module: getModule(),
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            plugins: [
                new TsConfigPathsPlugin({
                    configFileName: tsConfig
                })
            ]
        },
        devtool: getDevtool(),
        target: 'web',
        plugins: getPlugins(),
        stats: {
            colors: true
        }
    });

//#region 私有成员
const { isProduction, isTest, isLocalTest, isExpProduction } = ini;

const getMode = () => isProduction ? 'production' : 'development';

const getEntry = (): webpack.Configuration['entry'] => ({
    vendor: ['bowser', 'history', 'react', 'react-dom', 'react-redux', 'react-router-dom', 'redux', 'tslib'],
    web: (isLocalTest ? ['webpack-hot-middleware/client?reload=true'] : []).concat('./src/web/index')
});

const getOutput = (): webpack.Output => ({
    path: path.join(process.cwd(), config.BUNDLE_PATH),
    filename: `[name].bundle${isTest ? '' : '.' + process.env.APP_VERSION}.js`,
    chunkFilename: `[name].chunk${isTest ? '' : isExpProduction ? '.exp.[chunkhash]' : '.[chunkhash]'}.js`,
    publicPath: config.BUNDLE_PATH
});

const getModule = (): webpack.Module => ({
    rules: [
        {
            test: /\.(tsx?|jsx?)$/,
            use: [{
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: tsConfig,
                    useBabel: true,
                    useCache: isLocalTest,
                    babelOptions: {
                        babelrc: false,
                        ...getBabelrc()
                    },
                    babelCore: '@babel/core',
                    getCustomTransformers: () => ({
                        before: [createTransformer([
                            { style: isLocalTest ? 'css' : true },
                            {
                                style: false,
                                libraryName: 'lodash',
                                libraryDirectory: undefined,
                                camel2DashComponentName: false
                            }
                        ])]
                    })
                }
            }],
            include: [path.join(process.cwd(), 'src/web'), path.join(process.cwd(), 'src/public')]
        },
        isLocalTest ? {
            test: /\.css$/,
            use: [{
                loader: 'style-loader',
                options: {
                    sourceMap: false,
                    hmr: true
                }
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: false
                }
            }
            ]
        }
            : {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: false,
                            hmr: false
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            plugins: () => [
                                cssnano()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            sourceMap: false
                        }
                    }
                ]
            }]
});

const getDevtool = () => !isProduction ? 'inline-source-map' : false;

const getPlugins = (): webpack.Plugin[] => {
    const plugins: webpack.Plugin[] = [
        /* new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        }) */
    ];

    if (!isLocalTest) {
        plugins.push(
            new BundleAnalyzerPlugin({
                generateStatsFile: true,
                openAnalyzer: true,
                analyzerMode: 'static'
            })
        );
    }

    return plugins;
};
//#endregion
