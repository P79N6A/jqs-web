/**
 * Created by garrettzhou@2018-9-3
 * async helper
 */
import { hError, hReact } from 'my-local-web-helper';
import { uFunction, uObject } from 'my-local-web-util';

class HAsync {
    public static readonly instance: HAsync = new HAsync();
    private constructor() { }

    private readonly map: dp.Obj<dp.Obj<{
        status: PromiseStatus;
        task: Promise<any>;
    } | undefined>> = {};

    public readonly keys = {
        GLOBAL_UNIQUE: Symbol('GLOBAL_UNIQUE')
    };

    public readonly run = async <T= void>(task: Promise<T> | dp.PromiseFunc<any[], T>, options: Options = {}) => {
        const { action = eAsync.Action.Break, key, spinning = false, onSuccess, onFail, onEnd } = options;
        const promiseKey = Symbol();

        const handleStatus = (callback?: Function, noThrow = false) => {
            const status = (() => {
                if (key) {
                    const obj = this.map[key as any][promiseKey as any];
                    if (obj) {
                        if (obj.status === PromiseStatus.Running) {
                            return PromiseStatus.Running;
                        }
                        if (obj.status === PromiseStatus.BeHided) {
                            return PromiseStatus.BeHided;
                        }
                    }
                    return PromiseStatus.BeBreaked;
                }
                return PromiseStatus.Running;
            })();

            if (status === PromiseStatus.BeBreaked) {
                if (noThrow) return;
                throw new hError.Noop(`break ${key && key.toString()} promise`);
            }
            if (status === PromiseStatus.Running) {
                callback && callback();
            }
        };

        spinning && hReact.spinning();
        const promise = uFunction.check(task) ? task() : task;

        if (key) {
            if (!this.map[key as any]) {
                this.map[key as any] = {};
            }
            Object.getOwnPropertySymbols(this.map[key as any]).forEach(item => {
                const promiseInfo = this.map[key as any][item as any];
                if (promiseInfo) {
                    if (action === eAsync.Action.Break) {
                        promiseInfo.status = PromiseStatus.BeBreaked;
                    } else if (action === eAsync.Action.Hide) {
                        promiseInfo.status = PromiseStatus.BeHided;
                    }
                }
            });
            this.map[key as any][promiseKey as any] = {
                status: PromiseStatus.Running,
                task: promise
            };
        }

        try {
            const data = await promise;
            handleStatus(onSuccess);
            return data;
        } catch (error) {
            if (!uObject.checkInstance(error, hError.Noop)) {
                handleStatus(onFail);
            }
            throw error;
        } finally {
            spinning && hReact.spinning(false);
            handleStatus(onEnd, true);
            if (key) {
                this.map[key as any][promiseKey as any] = undefined;
            }
        }
    }
}

//#region 私有类型
type Options = {
    onSuccess?: Function;
    onFail?: Function;
    onEnd?: Function;
    spinning?: boolean;
    key?: symbol;
    action?: eAsync.Action;
};
const enum PromiseStatus {
    BeBreaked, BeHided, Running
}
//#endregion

export const hAsync = HAsync.instance;
export default hAsync;
