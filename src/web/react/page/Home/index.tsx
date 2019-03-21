/**
 * Created by garrettzhou@2018-8-13
 * Home
 */
import { BackTop, Layout } from 'antd';
import { AComponent } from 'my-local-web-component';
import config from 'my-local-web-config';
import { hReact, hRedux, hRequest } from 'my-local-web-helper';
import { uString, uTree } from 'my-local-web-util';
import React, { createRef } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import jss from './@jss';
import Header from './Header';
import Sider from './Sider';

const pathPrefix = '/Home';

const routes: { component: ReturnType<typeof hReact.getAsyncComponent>; path: string; exact?: boolean }[] = [
];

type Props = dReact.GetClassProps<typeof jss> & ReactRouter.RouteComponentProps & ReturnType<typeof mapState>;
type State = {
    moduleList: dReact.Home.ModuleItem[];
    treeModules: dData.Tree.Item<dReact.Home.ModuleItem>[];
    inited: boolean;
    defaultOpenKeys: string[];
    userRoutes: typeof routes;
};
class Home extends AComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            moduleList: [],
            treeModules: [],
            inited: false,
            defaultOpenKeys: [],
            userRoutes: []
        };
    }

    private readonly defaultModuleId = 2;

    private readonly contentRef = createRef<typeof Layout.Content>();

    private readonly getBackTopTarget = () => this.contentRef.current && findDOMNode((this.contentRef as any).current) as HTMLElement || window;

    private readonly getNowModule = (modules: dReact.Home.ModuleItem[]) => modules.find(item => !!item.url && uString.equalIgnoreCase(`#${pathPrefix}${item.url.trim()}`, location.hash.trim()));

    private readonly init = async () => {
        const initInfo = await hRequest.api.Home.getInitInfo();
        const userInfo = await hRequest.api.user.getNow();

        const nowModule = this.getNowModule(initInfo.modules);
        const defaultModule = initInfo.modules.find((item: any) => item.id === this.defaultModuleId);
        const fatherModule = nowModule ? initInfo.modules.find((item: any) => item.id === nowModule.pid) : initInfo.modules.find((item: any) => item.id === (defaultModule && defaultModule.pid || -1));

        this.setState({
            moduleList: initInfo.modules,
            userRoutes: routes.filter(route => !!initInfo.modules.find((item: any) => uString.equalIgnoreCase(`${pathPrefix}${item.url.trim()}`, route.path.trim()))),
            treeModules: uTree.create(initInfo.modules),
            inited: true,
            defaultOpenKeys: fatherModule && [fatherModule.id.toString()] || []
        });
        hRedux.dispatch(hRedux.action.userLogin({ nowUser: userInfo }));
    }

    public render() {
        const { userInfo, classes = {} } = this.props;
        const { moduleList, inited, defaultOpenKeys, treeModules, userRoutes } = this.state;

        const nowModule = this.getNowModule(moduleList);
        const selectKey = nowModule ? nowModule.id : this.defaultModuleId;
        return (
            <Layout className={classes.home} style={{ display: inited ? undefined : 'none' }}>
                <Sider moduleList={moduleList} selectKey={selectKey} defaultOpenKeys={defaultOpenKeys} treeModules={treeModules} isRedirect={!nowModule} />
                <Layout>
                    <Header moduleList={moduleList} userInfo={userInfo} selectKey={selectKey} />
                    <Layout.Content ref={this.contentRef as any}>
                        {inited && <BackTop target={this.getBackTopTarget} />}
                        <Switch>
                            {userRoutes.map((item, index) => <Route key={index} exact={item.exact === false ? false : true} path={item.path} component={item.component} />)}
                            {!!userRoutes.length && <Redirect from='*' to={`${pathPrefix}/User/UserInfo`} />}
                        </Switch>
                    </Layout.Content>
                    <Layout.Footer>{config.WEB_TITLE} ©2018</Layout.Footer>
                </Layout>
            </Layout>
        );
    }
    public componentDidMount() {
        this.init();
    }
}

const mapState = (state: dStore.State) =>
    ({
        userInfo: state.user.nowUser
    });

export default connect(mapState)(jss(Home));
