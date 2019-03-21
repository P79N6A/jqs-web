/**
 * Created by garrettzhou@2018-8-3
 * http请求常用类型
 */
declare namespace dHttp {
    type Api = any;

    interface SuccessJsonBody<T> extends JsonBody {
        code: eHttp.JsonSuccessCode.Success;
        data: T;
    }
    interface ErrorJsonBody extends JsonBody {
        code: eHttp.JsonErrorCode;
        data?: undefined;
    }

    type JsonBody = {
        code: eHttp.JsonErrorCode | eHttp.JsonSuccessCode.Success;
        msg?: string;
        version?: string;
    };

    type ApiData<Req, Rsp> = {
        req: Req;
        rsp: Rsp;
    };

    type Method = 'POST' | 'GET';
    type ContentDispositionType = 'inline' | 'attachment';
}
