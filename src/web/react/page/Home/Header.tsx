/**
 * Created by garrettzhou@2018-8-13
 * Home Header
 */
import { Avatar, Breadcrumb, Button, Icon, Layout } from 'antd';
import { AComponent } from 'my-local-web-component';
import { hPrompt, hUser } from 'my-local-web-helper';
import { uTree } from 'my-local-web-util';
import React from 'react';

type Props = {
    moduleList: dReact.Home.ModuleItem[];
    userInfo: dStore.NowUser;
    selectKey: number;
};
type State = dReact.State;
export default class Header extends AComponent<Props, State> {
    private readonly onLogout = async () => {
        const msg = '您确定要退出登录?';

        if (await hPrompt.confirmModal(msg)) {
            hUser.logout();
        }
    }

    public render() {
        const { moduleList, userInfo, selectKey } = this.props;

        return (
            <Layout.Header>
                <Breadcrumb>
                    <Breadcrumb.Item><Icon type='home' /></Breadcrumb.Item>
                    {
                        uTree.getPath(selectKey, moduleList).reverse().map(item =>
                            <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
                        )
                    }
                </Breadcrumb>
                <div className='header-right'>
                    <Avatar icon={userInfo && userInfo.icon || 'user'} />&nbsp;{userInfo && userInfo.nickName}&emsp;
                    <Button shape='circle' icon='logout' onClick={this.onLogout} />
                </div>
            </Layout.Header>
        );
    }
}
