/**
 * Created by garrettzhou@2018-8-13
 * Root
 */
import { Spin } from 'antd';
import { AComponent } from 'my-local-web-component';
import { hReact, hReport, hRequest } from 'my-local-web-helper';
import React, { /* StrictMode */ } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import jss from './@jss/Root';

const routes = [
    {
        component: hReact.getAsyncComponent(() => import('./Home')),
        path: '/Home',
        exact: false
    },
    {
        component: hReact.getAsyncComponent(() => import('./Login')),
        path: '/Login',
        exact: true
    }
];

type Props = dReact.GetClassProps<typeof jss> & ReturnType<typeof mapState>;
type State = {
    initInfo?: dHttp.Api['Root']['getGlobalInitInfo']['rsp'];
};
class _Root extends AComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    private readonly init = async () => {
        const rsp = await hRequest.api.Root.getGlobalInitInfo();
        this.setState({
            initInfo: rsp
        });
    }

    public render() {
        const { spinning, classes = {} } = this.props;
        const Provider = hReact.rootContext.Provider;

        const content = (
            <Provider value={{ classes }}>
                <HashRouter>
                    <div className={classes.root} >
                        <Spin className={classes.spinning} spinning={spinning} />
                        <Switch>
                            {routes.map((item, index) => <Route key={index} exact={item.exact} path={item.path} component={item.component} />)}
                            <Redirect from='*' to='/Home' />
                        </Switch>
                    </div>
                </HashRouter>
            </Provider>
        );
        // 需要检查react规范时可开启严格模式
        // return <StrictMode>{content}</StrictMode>;
        return content;
    }
    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        hReport.webReactError({
            key: 'componentDidCatch',
            details: errorInfo,
            error
        });
    }
    public componentDidMount() {
        this.init();
    }
}

const mapState = (state: dStore.State) =>
    ({
        spinning: state.root.spinning
    });

let Root = connect(mapState)(jss(_Root));
if (process.env.IS_LOCAL_TEST) {
    // tslint:disable-next-line:no-implicit-dependencies no-require-imports no-var-requires
    Root = require('react-hot-loader').hot(module)(Root);
}

export default Root;
