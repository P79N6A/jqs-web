/**
 * Created by garrettzhou@2018-9-4
 * error helper
 */
import { hPrompt, hReport } from 'my-local-web-helper';
import { uObject } from 'my-local-web-util';

class HError {
    public static readonly instance: HError = new HError();
    private constructor() { }

    public get Common() { return CommonError; }
    public get Noop() { return NoopError; }

    public readonly catch = async (error?: CommonError | NoopError | Error) => {
        if (uObject.checkInstance(error, NoopError)) {
            return;
        }
        const key = 'web_hError_catch';
        if (uObject.checkInstance(error, CommonError)) {
            const { options, logOptions } = error;

            if (logOptions) {
                hReport.log({
                    ...logOptions,
                    msg: logOptions.msg || options.msg,
                    key: logOptions.key || key,
                    source: error
                });
            }

            const { showPrompt, promptStyleType = ePrompt.StyleType.Error, onOk, onCancel, onEnd } = options;
            const { msg = '操作失败！' } = options;
            if (showPrompt === ePrompt.Type.Modal) {
                if (await hPrompt.createModal(msg, promptStyleType)) {
                    onOk && onOk();
                } else {
                    onCancel && onCancel();
                }
            } else if (showPrompt === ePrompt.Type.Message) {
                hPrompt.createMessage(msg, promptStyleType);
            }
            onEnd && onEnd();
        } else {
            // hPrompt.errorModal(err.message || '操作失败！');
            hReport.log({
                error,
                key: `${key}_unknown`,
                fileName: 'webUnknownError',
                attribute: true,
                always: true
            });
        }
    }
}

class CommonError extends Error {
    constructor(
        public options: dError.Options,
        public logOptions: LogOptions | false = false
    ) {
        super();
    }
    public readonly name: string = 'CommonError';
}

class NoopError extends Error {
    public readonly name = 'NoopError';
}
//#region 私有类型
type LogOptions = dp.ExculdePick<dReport.LogOptions, 'source' | 'key'> & {
    key?: string;
};
//#endregion
export const hError = HError.instance;
export default hError;
