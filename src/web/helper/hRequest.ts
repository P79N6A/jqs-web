/**
 * Created by garrettzhou@2018-9-3
 * request helper, 用于请求node接口
 */
import config from 'my-local-web-config';
import { hError, hNavigator, hPrompt, hReport, hTask, hUser } from 'my-local-web-helper';
import { uHttp, uObject, uString } from 'my-local-web-util';

class HRequest {
    public static readonly instance: HRequest = new HRequest();
    private constructor() { }

    private readonly VERSION_UPDATE_TASK_ID = Symbol('VERSION_UPDATE_TASK_ID');

    public readonly api: dRequest.Api = new Proxy<any>({}, {
        get: (_target, controllerName) =>
            new Proxy({}, {
                get: (_controller, actionName) =>
                    (req: any, opt: dRequest.Options = {}) => {
                        const { isFormRequest, noHandle } = opt;
                        const url = this.getLocalUrl(`/${controllerName.toString()}/${actionName.toString()}`);

                        if (isFormRequest) {
                            this.formRequest(url, req);
                            return null;
                        }

                        if (noHandle) {
                            return this.successNoHandle(url, req, opt);
                        }
                        return this.success(url, req, opt);
                    }
            })
    });

    private readonly formRequest = (url: string, req?: dp.Obj, opt: dRequest.Options = {}) => {
        const { type = uHttp.EHttpType.POST } = opt;

        const iframe = document.createElement('iframe');
        iframe.setAttribute('style', 'display:none;');

        const form = document.createElement('form');
        form.method = type;
        form.action = url;

        const input = document.createElement('input');
        input.name = config.FORM_REQUEST_NAME;
        input.value = req && JSON.stringify(req) || '';

        document.body.appendChild(iframe);
        form.appendChild(input);
        iframe.appendChild(form);

        form.submit();

        input.remove();
        form.remove();
        iframe.remove();
    }

    private readonly getLocalUrl = (url: string) => config.REQUEST_URL_PREFIX + url;

    private readonly success = async <T>(url: string, req?: dp.Obj | null, opt: dRequest.Options = {}): Promise<T> => {
        const { type = uHttp.EHttpType.POST, noReport } = opt;

        const defaultMsg = '通信异常！请稍后再试！';
        const details: RequestInfo = {
            url,
            req,
            rsp: null
        };
        const showPrompt = ePrompt.Type.Modal;
        const key = 'web_hRequest_success_';

        let rsp: dHttp.SuccessJsonBody<T> | dHttp.ErrorJsonBody | null;
        try {
            rsp = await this.apiFetch<dHttp.SuccessJsonBody<T> | dHttp.ErrorJsonBody | null>(type, url, req, opt);
            details.rsp = rsp;
        } catch (error) {
            throw new hError.Common({
                msg: error && (error.msg || error.message) || defaultMsg,
                showPrompt
            }, noReport === true ? false : {
                key: `${key}rsp_error`,
                fileName: 'webTopError',
                details,
                error,
                always: true,
                attribute: true
            });
        }

        if (!rsp) {
            throw new hError.Common({
                msg: defaultMsg,
                showPrompt
            }, noReport === true ? false : {
                key: `${key}rsp_empty`,
                fileName: 'webTopError',
                details,
                always: true,
                attribute: true
            });
        }

        if (rsp.version && rsp.version !== process.env.APP_VERSION) {
            hTask.timedTask(this.VERSION_UPDATE_TASK_ID, async () => {
                if (await hPrompt.confirmModal('系统已经升级！是否要刷新页面完成升级？(继续使用旧版可能导致未知错误)')) {
                    hNavigator.resetToHome();
                    throw new hError.Noop();
                }
            });
        }

        if (rsp.data !== undefined && rsp.code === eHttp.JsonSuccessCode.Success) {
            return rsp.data;
        }
        const code = rsp.code;

        if (code === eHttp.JsonErrorCode.NoLogin) {
            throw new hError.Common({
                msg: rsp.msg || '请登录！',
                showPrompt: ePrompt.Type.Message,
                onEnd: () => {
                    hUser.logout();
                }
            });
        }

        if (code === eHttp.JsonErrorCode.OaLoginExpire) {
            throw new hError.Common({
                msg: rsp.msg,
                showPrompt: ePrompt.Type.Message
            });
        }

        if (code === eHttp.JsonErrorCode.PermissionDenied) {
            throw new hError.Common({
                msg: rsp.msg || '没有权限！',
                showPrompt
            });
        }

        throw new hError.Common({
            msg: `${rsp.msg || defaultMsg}(code=${rsp.code})`,
            showPrompt
        });
    }
    private readonly successNoHandle = async <T>(url: string, req?: dp.Obj | null, opt: dRequest.DetailsOptions = {}) => {
        const { type = uHttp.EHttpType.POST, checkLogin, noReport } = opt;

        const defaultMsg = '通信异常！请稍后再试！';
        const details: RequestInfo = {
            url,
            req,
            rsp: null
        };
        const key = 'web_hRequest_successNoHandle_';

        let rsp: dHttp.SuccessJsonBody<T> | dHttp.ErrorJsonBody;
        try {
            rsp = await this.apiFetch<dHttp.SuccessJsonBody<T> | dHttp.ErrorJsonBody>(type, url, req, opt);
            details.rsp = rsp;
        } catch (error) {
            const msg = error && (error.msg || error.message) || defaultMsg;
            if (!noReport) hReport.webTopError({ key: `${key}rsp_error`, msg, error, details });
            return {
                code: eHttp.JsonErrorCode.AjaxError,
                msg
            };
        }

        const code = rsp.code;

        if (checkLogin) {
            if (code === eHttp.JsonErrorCode.NoLogin) {
                throw new hError.Common({
                    msg: rsp.msg || '请登录！',
                    showPrompt: ePrompt.Type.Message,
                    onEnd: () => {
                        hUser.logout();
                    }
                });
            }
        }

        if (code === eHttp.JsonErrorCode.OaLoginExpire) {
            throw new hError.Common({
                msg: rsp.msg,
                showPrompt: ePrompt.Type.Message
            });
        }

        return {
            ...rsp,
            data: rsp.data
        };
    }

    private readonly apiFetch = async <T>(type: dHttp.Method, url: string, req?: dp.Obj | FormData | null, opt: dRequest.Options = {}) => {
        const ajax = await this.fetch(type, url, req, opt);

        const data = uObject.jsonParse<T>(ajax.responseText);

        if (data) {
            return data;
        }
        throw {
            response: {
                responseText: encodeURIComponent(ajax.responseText),
                status: ajax.status,
                statusText: encodeURIComponent(ajax.statusText)
            },
            request: {
                type,
                url,
                req,
                opt
            },
            msg: '网络异常！请稍后再试'
        };
    }

    public readonly fetch = (type: dHttp.Method, url: string, req?: dp.Obj | FormData | null, opt: dRequest.Options = {}) => {
        const sendData = req || {};
        const p = new Promise<XMLHttpRequest>((resolve, reject) => {
            const { timeout = eDate.Timespan.RequestTimeout, contentType = uHttp.EContentType.JSON } = opt;
            const ajax = new XMLHttpRequest();
            ajax.responseType = 'text';

            setTimeout(() => {
                reject({ msg: '请求超时！' });
                ajax.abort();
            }, timeout);

            const readyState = 4;
            ajax.onreadystatechange = () => {
                if (ajax.readyState !== readyState) {
                    return;
                }
                resolve(ajax);
            };

            if (uString.equalIgnoreCase(type, uHttp.EHttpType.GET)) {
                ajax.open(type, `${url}?${uHttp.createUrlQuery(sendData)}`, true);
                ajax.send(undefined);
            } else {
                ajax.open(type, url, true);
                ajax.setRequestHeader('x-requested-with', 'XMLHttpRequest');

                if (typeof FormData !== 'undefined' && uObject.checkInstance(sendData, FormData)) {
                    ajax.send(sendData);
                } else {
                    ajax.setRequestHeader('Content-Type', contentType);
                    if (contentType === uHttp.EContentType.JSON) {
                        ajax.send(JSON.stringify(sendData));
                    } else if (contentType === uHttp.EContentType.FORM) {
                        ajax.send(uHttp.createUrlQuery(sendData));
                    }
                }
            }
        });

        return p;
    }
}

type RequestInfo = {
    url: string;
    req: any;
    rsp: any;
};

export const hRequest = HRequest.instance;
export default hRequest;
