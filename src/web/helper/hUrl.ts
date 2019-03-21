/**
 * Created by garrettzhou@2018-8-20
 * url helper
 */

import config from 'my-local-web-config';

class HUrl {
    public static readonly instance: HUrl = new HUrl();
    private constructor() { }

    public readonly full = (url = '') => `${location.protocol}//${location.host}${config.REQUEST_URL_PREFIX}${url}`;

    public image = (imgName: string) => `${config.IMG_PATH}/${imgName}`;
}

export const hUrl = HUrl.instance;
export default hUrl;
