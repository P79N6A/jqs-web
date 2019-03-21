/**
 * Created by garrettzhou@2018-9-3
 * redux helper
 */
import { cloneDeep } from 'lodash';
import { combineReducers, createStore } from 'redux';

import action from './action';
import * as reducer from './reducer';

class HRedux {
    public static readonly instance: HRedux = new HRedux();
    private constructor() { }

    private store?: Redux.Store<dStore.State>;
    public readonly action = action as dRedux.Action;

    public get Store() {
        if (!this.store) {
            this.store = this.storeCreater();
        }
        return this.store;
    }
    public get State() {
        return this.Store.getState();
    }

    private readonly storeCreater = (initState?: dStore.State) => {
        const reducers = Object.keys(reducer).reduce<any>((obj, item) => {
            obj[item] = this.createReducer((reducer as any)[item]);
            return obj;
        }, {});
        const Reducer = combineReducers<dStore.State>(reducers);
        if (initState) {
            return createStore(Reducer, initState);
        }
        return createStore(Reducer);
    }

    private readonly createReducer = <T>({ defaultState, handlers }: { defaultState: T; handlers: dp.Obj<Function | undefined> }) =>
        (state = cloneDeep(defaultState), actionResult: { type: string; newValue: any }) => {
            const handler = handlers[actionResult.type];
            if (handler) {
                return handler(state, actionResult.newValue);
            }
            return state;
        }

    public readonly dispatch = <T extends dRedux.ActionResult[keyof dRedux.ActionResult]>(actionResult: T) => {
        this.Store.dispatch(actionResult);
    }
}

export const hRedux = HRedux.instance;
export default hRedux;
