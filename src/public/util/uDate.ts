/**
 * Created by garrettzhou@2018-8-3
 * 时间工具
 */
import moment from 'moment';

namespace _uDate {
    export const formatKey = {
        YMD: 'YYYY-MM-DD',
        YMD_Hm: 'YYYY-MM-DD HH:mm',
        YMD_Hm_ss: 'YYYY-MM-DD HH:mm:ss'
    };

    export const format = (t: moment.MomentInput, key: string = formatKey.YMD_Hm) => moment(t).format(key);
}

export const uDate: dp.DeepReadonly<typeof _uDate> = _uDate;
export default uDate;
