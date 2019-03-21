/**
 * Created by garrettzhou@2018-7-19
 * 项目基础配置文件
 */
namespace config {
    export const APP_KEY = 'jqs-web';

    export const WEB_TITLE = '剧情杀管理后台';

    export const REQUEST_URL_PREFIX = '';

    export const COMMON_KEY_PREFIX = '_jqs__web___';

    export const ASSETS_PATH = '/assets';

    export const BUNDLE_PATH = `${ASSETS_PATH}/bundle`;

    export const TEMPLATE_PATH = `${ASSETS_PATH}/template`;

    export const PUBLIC_ASSETS_PATH = `${ASSETS_PATH}/public`;

    export const IMG_PATH = `${PUBLIC_ASSETS_PATH}/img`;

    export const WX_APPID = '';

    export const COOKIE_GUID_KEY = `${COMMON_KEY_PREFIX}guid`;

    export const FORM_REQUEST_NAME = `${COMMON_KEY_PREFIX}_form__request___name_`;
}

export default config as dp.DeepReadonly<typeof config>;
