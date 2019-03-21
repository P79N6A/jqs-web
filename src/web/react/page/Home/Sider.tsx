/**
 * Created by garrettzhou@2018-8-13
 * Home Sider
 */
import { Icon, Layout, Menu } from 'antd';
import { uniq } from 'lodash';
import { AComponent } from 'my-local-web-component';
import { hNavigator, hUrl } from 'my-local-web-helper';
import React from 'react';

type Props = {
    moduleList: dReact.Home.ModuleItem[];
    selectKey: number;
    defaultOpenKeys: string[];
    treeModules: dData.Tree.Item<dReact.Home.ModuleItem>[];
    isRedirect: boolean;
};
type State = {
    collapsed: boolean;
    openKeys?: string[];
};
export default class Sider extends AComponent<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            collapsed: false
        };
    }

    private readonly onCollapse: dReact.GetProps<typeof Layout.Sider>['onCollapse'] = collapsed => this.setState({ collapsed, openKeys: [] });

    private readonly onOpenChange: dReact.GetProps<Menu>['onOpenChange'] = openKeys => this.setState({ openKeys });

    public render() {
        const { selectKey, treeModules, defaultOpenKeys } = this.props;
        const { collapsed, openKeys } = this.state;

        return (
            <Layout.Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className='logo'>
                    <img className={collapsed ? 'small' : 'big'} src={hUrl.image(collapsed ? 'logo-small.jpg' : 'logo-big.jpg')} />
                </div>
                <Menu theme='dark' selectedKeys={selectKey && [selectKey.toString()] || []} openKeys={openKeys || defaultOpenKeys} onOpenChange={this.onOpenChange} mode='inline'>
                    {
                        treeModules.map(item =>
                            <Menu.SubMenu key={item.id} disabled={!item.children || !item.children.length} title={<span><Icon type={item.icon || 'menu-unfold'} /><span>{item.name}</span></span>}>
                                {
                                    item.children && item.children.map((one: any) =>
                                        <Menu.Item key={one.id} onClick={() => hNavigator.push(`/Home${one.url || ''}`)}>{one.name}</Menu.Item>
                                    )
                                }
                            </Menu.SubMenu>
                        )
                    }
                </Menu>
            </Layout.Sider>
        );
    }

    public componentDidUpdate(prevProps: Readonly<Props>) {
        const { moduleList, isRedirect, selectKey, defaultOpenKeys } = this.props;
        if (isRedirect && !prevProps.isRedirect) {
            const { openKeys } = this.state;

            const nowModule = moduleList.find(item => item.id === selectKey);
            const parentModule = nowModule && moduleList.find(item => item.id === nowModule.pid);

            this.setState({
                openKeys: uniq((openKeys || defaultOpenKeys).concat(parentModule ? [parentModule.id.toString()] : []))
            });
        }
    }
}
