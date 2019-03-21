/**
 * Created by garrettzhou@2018-8-13
 * AComponent
 */
import { hReact } from 'my-local-web-helper';
import { uObject, uString } from 'my-local-web-util';
import { PureComponent } from 'react';

export abstract class AComponent<P= dReact.Props, S= dReact.State> extends PureComponent<P, S> {
    public static contextType = hReact.rootContext;
    public context!: dReact.RootContext;

    /**
     * 该方法能更便捷的修改state的深层属性并根据opt实现对value的简单效验。
     */
    protected onValueChange = <TKey extends keyof S>(value: Partial<S[TKey]>, key: TKey, opt: { length?: number; callback?: dp.Func } = {}) => {
        const { length, callback } = opt;
        if (length != null && uString.check(value)) {
            if (value.length > length) return;
        }

        const oldValue = this.state[key];
        let newState: any;
        if (uObject.check(value) && Object.getPrototypeOf(value).constructor === Object) {
            newState = {
                [key]: {
                    ...(oldValue as any),
                    ...value
                }
            };
        } else {
            newState = {
                [key]: value
            };
        }

        this.setState(newState, callback);
    }
}
export default AComponent;
