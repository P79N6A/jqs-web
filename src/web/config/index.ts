/**
 * Created by garrettzhou@2018-8-13
 * web 配置文件
 */
import base from '../../public/config';

namespace _config {
    export const QQ_LOGIN_URL = 'https://column.3g.qq.com/connect/qq/oauth';
}

const config: dp.DeepReadonly<typeof base & typeof _config> = {
    ...base,
    ..._config
};

export default config;
