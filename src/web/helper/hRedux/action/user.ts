/**
 * Created by garrettzhou@2018-8-30
 * redux user action
 */
export default {
    userClear() {
        return {
            type: this.userClear.name
        };
    },
    userLogin(newValue: dStore.User) {
        return {
            type: this.userLogin.name,
            newValue
        };
    }
};
