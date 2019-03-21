/**
 * Created by garrettzhou@2018-8-30
 * redux user reducer
 */
import { cloneDeep } from 'lodash';

type State = dStore.User;
const defaultState: State = {
    nowUser: null
};

const handlers: dRedux.ReducerHandlers<State> = {
    reset: () => cloneDeep(defaultState),
    recover: (_state, newValue) => newValue.user,

    userClear: state => ({ ...state, nowUser: null }),
    userLogin: (state, newValue) =>
        ({
            ...state,
            ...newValue
        })
};

export const user = {
    defaultState,
    handlers
};
