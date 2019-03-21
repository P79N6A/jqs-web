/**
 * Created by garrettzhou@2018-9-1
 * error 常用类型
 */
declare namespace dError {
    type Options = {
        msg?: string;
        showPrompt?: ePrompt.Type | false;
        promptStyleType?: ePrompt.StyleType;
        onOk?: Function;
        onCancel?: Function;
        onEnd?: Function;
    };
}
