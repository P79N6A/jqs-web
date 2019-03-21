/**
 * Created by garrettzhou@2018-8-20
 * react helper
 */
import { hRedux } from 'my-local-web-helper';
import React, { createContext, memo } from 'react';
class HReact {
    public static readonly instance: HReact = new HReact();
    private constructor() { }

    private lastShowSpinningTime = 0;

    public readonly rootContext = createContext<dReact.RootContext>({ classes: {} });

    public readonly getAsyncComponent = (importComponent?: dp.PromiseFunc<any[], { default: React.ComponentType<any> }>) =>
        class AsyncComponent extends React.Component<object, { component: null | React.ComponentType<any> }> {
            constructor(props: object) {
                super(props);

                this.state = {
                    component: null
                };
            }

            public render() {
                const Component = this.state.component;

                return Component ? <Component {...this.props} /> : null;
            }

            public async componentDidMount() {
                if (importComponent) {
                    const { default: component } = await importComponent();

                    this.setState({
                        component
                    });
                }
            }
        }

    public readonly spinning = (show = true) => {
        const nowShow = hRedux.State.root.spinning;
        if (nowShow !== show) {
            if (!nowShow) {
                this.lastShowSpinningTime = Date.now();
                hRedux.dispatch(hRedux.action.rootSpinning(true));
            } else {
                const minSpan = 300;
                let span = minSpan - (Date.now() - this.lastShowSpinningTime);
                if (span < 0) span = 0;
                setTimeout(() => hRedux.dispatch(hRedux.action.rootSpinning(false)), span);
            }
        }
    }

    public readonly createAutoDestroyModal = <TProps extends { visible?: boolean }>(Component: React.ComponentType<TProps>) => memo(
        (props: TProps) => props.visible ? <Component {...props} /> : null
    )
}

export const hReact = HReact.instance;
export default hReact;
