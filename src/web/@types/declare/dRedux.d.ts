/**
 * Created by garrettzhou@2018-9-1
 * redux 常用类型
 */
import action from '../../helper/hRedux/action';

declare namespace dRedux {
    type Action = {
        [K in keyof ActionType]:
        ActionType[K] extends () => any ?
        () => ActionResult[K] :
        ActionType[K] extends (newValue: infer Value) => any ?
        (newValue: Value) => ActionResult[K] : never;
    };

    type ActionResult = {
        [K in keyof ActionReturn]: ActionReturn[K] extends { type: string; newValue: any } ?
        { type: K; newValue: ActionReturn[K]['newValue'] } :
        { type: K }
    };
    type ReducerHandlers<S> = {
        [K in keyof ActionType]?: ReducerHandler<S, K>;
    };
}
//#region 私有类型
type ActionType = typeof action;
type ActionReturn = {
    [K in keyof ActionType]: ReturnType<ActionType[K]>;
};
type ReducerHandler<S, K extends keyof ActionType> = GetActionValue<K> extends never ? (state: S) => S : (state: S, newValue: GetActionValue<K>) => S;
type GetActionValue<K extends keyof ActionType> = ActionType[K] extends () => any ? never : ActionType[K] extends (newValue: infer V) => any ? V : never;
//#endregion
export = dRedux;
export as namespace dRedux;
