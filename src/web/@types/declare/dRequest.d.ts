/**
 * Created by garrettzhou@2018-9-1
 * request 常用类型
 */
declare namespace dRequest {
    interface Options<TNoHandle extends boolean | undefined= undefined, TFormRequest extends boolean | undefined= undefined> {
        noHandle?: TNoHandle;
        timeout?: number;
        contentType?: string;
        isFormRequest?: TFormRequest;
        type?: dHttp.Method;
        noReport?: boolean;
    }

    interface DetailsOptions<TNoHandle extends boolean | undefined= undefined, TFormRequest extends boolean | undefined= undefined> extends Options<TNoHandle, TFormRequest> {
        checkLogin?: boolean;
    }

    type GetReq<T> = T extends dHttp.ApiData<any, any> ? T['req'] : never;
    type GetRsp<T> = T extends dHttp.ApiData<any, any> ? T['rsp'] : never;

    type Details<T> = dHttp.SuccessJsonBody<T> | dHttp.ErrorJsonBody;

    type Api = any;
}
