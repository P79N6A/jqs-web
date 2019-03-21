/**
 * Created by garrettzhou@2018-8-3
 * storage 工具
 */
namespace _uStorage {
    export const clear = () => {
        if (window.localStorage) {
            window.localStorage.clear();
        }
    };

    export const getValue = (key: string) => {
        if (window.localStorage) {
            return window.localStorage.getItem(key);
        }
        return null;
    };

    export const setValue = (key: string, value: string) => {
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        }
    };

    export const remove = (key: string) => {
        if (window.localStorage) {
            window.localStorage.removeItem(key);
        }
    };
}

export const uStorage: dp.DeepReadonly<typeof _uStorage> = _uStorage;
export default uStorage;
