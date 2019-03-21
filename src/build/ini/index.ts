/**
 * Created by garrettzhou@2018-8-19
 * 项目构建初始化文件
 */
namespace ini {
    const envValue = {
        RUN_ENV: {
            PRODUCTION: 'production',
            EXP_PRODUCTION: 'expProduction',
            TEST: 'test',
            LOCAL_TEST: 'localTest'
        }
    };

    export const isExpProduction = process.env.RUN_ENV === envValue.RUN_ENV.EXP_PRODUCTION;
    export const isProduction = process.env.RUN_ENV === envValue.RUN_ENV.PRODUCTION || isExpProduction;

    export const isLocalTest = !process.env.RUN_ENV || process.env.RUN_ENV === envValue.RUN_ENV.LOCAL_TEST;
    export const isTest = process.env.RUN_ENV === envValue.RUN_ENV.TEST || isLocalTest;

    export const NODE_ENV_VALUE = isProduction ? envValue.RUN_ENV.PRODUCTION : envValue.RUN_ENV.TEST;
}

export default ini as dp.DeepReadonly<typeof ini>;
