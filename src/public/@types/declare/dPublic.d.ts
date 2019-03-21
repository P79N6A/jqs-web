/**
 * Created by garrettzhou@2018-8-3
 * 公共的常用类型
 */
declare namespace dp {
    type AllowNon<T> = T | undefined | null;

    type AllowValueNon<T extends object> = {
        [P in keyof T]?: T[P] | null;
    };

    type UrlParams = number | string | boolean | null | undefined;

    type Keys = keyof any;

    type Obj<T= any> = {
        [K in Keys]: T;
    };

    type Func<P extends any[]= any[], T= any> = (...p: P) => T;

    type Class<P extends any[]= any[], T= any> = new (...p: P) => T;

    type GetClassParams<T extends Class> = T extends Class<infer P> ? P : never;

    type GetFuncParams<T extends Func> = T extends Func<infer P> ? P : never;

    type PromiseFunc<P extends any[]= any[], T= any> = (...p: P) => Promise<T>;

    type PromiseOrSelf<T> = Promise<T> | T;

    type AllowKeys<T extends { [p in Exclude<keyof T, K>]: never }, K extends string> = T;

    type NeedKeys<T extends Record<K, any>, K extends string> = T;

    type StrictKeys<T extends Record<K, any> & { [p in Exclude<keyof T, K>]: never }, K extends string> = T;

    type ExculdePick<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

    type DeepReadonly<T> =
        T extends Function ? T :
        T extends any[] ? DeepReadonlyArray<T[number]> :
        T extends object ? DeepReadonlyObject<T> : T;

    type DeepWritable<T> =
        T extends Function ? T :
        T extends ReadonlyArray<any> ? DeepWritableArray<T[number]> :
        T extends object ? DeepWritableObject<T> : T;

    type NonFuncProp<T> = Pick<T, NonFuncPropNames<T>>;
    type NonFuncPropNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

    type PromiseFuncProp<T> = Pick<T, PromiseFuncPropNames<T>>;
    type PromiseFuncPropNames<T> = { [K in keyof T]: T[K] extends PromiseFunc ? K : never }[keyof T];

    type CustomProcessEnv = {
        RUN_ENV: any;

        APP_VERSION: any;

        NODE_ENV_VALUE: any;

        IS_PRODUCTION: any;
        IS_EXP_PRODUCTION: any;

        IS_TEST: any;
        IS_LOCAL_TEST: any;
    };
}

export = dp;
export as namespace dp;

//#region 私有类型
interface DeepReadonlyArray<T> extends ReadonlyArray<dp.DeepReadonly<T>> { }

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: dp.DeepReadonly<T[P]>;
};

type DeepWritableObject<T> = {
    -readonly [P in keyof T]: dp.DeepWritable<T[P]>;
};

interface DeepWritableArray<T> extends Array<dp.DeepWritable<T>> { }
//#endregion
