/**
 * Created by garrettzhou@2018-8-3
 * cookie 工具
 */
namespace _uCookie {
    export const setValue = (name: string, value: string, days?: number | 'keep') => {
        const keepDays = 300000;

        let exp: Date | null = null;
        if (days != null) {
            exp = new Date();
            exp.setTime(exp.getTime() + (days === 'keep' ? keepDays : days) * eDate.MillisecondCount.OneDay);
        }

        document.cookie = `${name}=${encodeURIComponent(value)}${exp == null ? '' : (';expires=' + exp.toUTCString())}`;
    };

    export const getValue = (name: string) => {
        const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
        const arr = document.cookie.match(reg);
        if (arr) {
            return decodeURIComponent(arr[2]);
        }
        return null;
    };

    export const removeValue = (name: string) => {
        setValue(name, '', -1);
    };
}

export const uCookie: dp.DeepReadonly<typeof _uCookie> = _uCookie;
export default uCookie;
