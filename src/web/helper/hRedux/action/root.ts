/**
 * Created by garrettzhou@2018-8-30
 * redux root action
 */
export default {
    rootSpinning(newValue: boolean) {
        return {
            type: this.rootSpinning.name,
            newValue
        };
    }
};
