/**
 * Created by garrettzhou@2018-8-30
 * redux root reducer
 */
import { cloneDeep } from 'lodash';

type State = dStore.Root;
const defaultState: State = {
    spinning: false
};

const handlers: dRedux.ReducerHandlers<State> = {
    reset: () => cloneDeep(defaultState),
    recover: (_state, newValue) => newValue.root,

    rootSpinning: (state, newValue) =>
        ({
            ...state,
            spinning: newValue
        })
};

export const root = {
    defaultState,
    handlers
};
