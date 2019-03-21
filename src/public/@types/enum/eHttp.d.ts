/**
 * Created by garrettzhou@2018-8-1
 * http请求常用枚举
 */
declare namespace eHttp {
    const enum JsonSuccessCode {
        Success = 0
    }
    const enum JsonErrorCode {
        //#region 通用
        CommonFail = 10, // 失败
        ParameterError = 20, // 参数异常
        AjaxError = 30, // ajax执行异常
        WebLogicError = 40, // 前端逻辑异常，通常需要刷新页面
        Timeout = 50, // 超时
        Maintenancing = 60, // 系统维护中
        //#endregion

        //#region 权限
        NoLogin = 1000, // 未登录
        LoginFail = 1001, // 登录失败
        PermissionDenied = 1100, // 未授权
        OaLoginExpire = 1200, // Oa过期
        //#endregion

        //#region 数据库
        DbError = 2000, // 数据库异常
        //#endregion

        //#region taf
        TafError = 3000, // taf异常
        CircleSessionError = 3100, // circle session异常
        //#endregion

        //#region 文件
        UploadRequestError = 4000, // 上传请求错误
        UploadFileSizeError = 4100, // 文件大小错误
        UploadFileIsEmpty = 4200, // 文件为空
        UploadFileInitFail = 4300 // 初始化失败
        //#endregion
    }
    const enum StatusCode {
        Ok = 200,
        TemporarilyMoved = 302,
        NoLogin = 401,
        PermissionDenied = 403,
        NotFound = 404,
        ServerError = 500
    }
}
