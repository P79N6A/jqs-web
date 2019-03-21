/**
 * Created by garrettzhou@2018-8-30
 * redux action
 */
import root from './root';
import user from './user';

export default {
    ...root,
    ...user,
    reset() {
        return {
            type: this.reset.name
        };
    },
    recover(newValue: dStore.State) {
        return {
            type: this.recover.name,
            newValue
        };
    }
};
