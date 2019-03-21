/**
 * Created by garrettzhou@2018-8-12
 * report常用类型
 */
declare namespace dReport {
    type LogFileName =
        'log' | 'error' | 'unknownError' | 'statusError' |
        'beginLog' | 'endLog' |
        'tafError' | 'tafLog' |
        'dbError' | 'dbLog' |
        'topError' | 'appError' |
        'webLog' | 'webError' | 'webTopError' | 'webUnknownError' | 'webReactError' |
        'other';

    type LogOptions = {
        key: string;
        msg?: string;
        details?: dp.Obj;
        error?: Error;
        source?: Error;
        attribute?: boolean;
        always?: boolean;
        fileName?: dReport.LogFileName;
    };
}
