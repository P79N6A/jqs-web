/**
 * Created by garrettzhou@2018-8-13
 * web 全局hack
 */
export default async () => {
    (Error as any) = class extends Error {
        constructor(...p: dp.GetClassParams<ErrorConstructor>) {
            super(...p);
            setTimeout(() => hError.catch(this), 0);
        }
    };
    const hError = (await import('./helper/hError')).default;
};
