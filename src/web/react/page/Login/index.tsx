/**
 * Created by garrettzhou@2018-8-13
 * Login
 */

import { Tabs } from 'antd';
import { AComponent } from 'my-local-web-component';
import React from 'react';

import jss from './@jss';

const TabPane = Tabs.TabPane;

type tProps = dReact.GetClassProps<typeof jss>;
type tState = {
    wxUrl: string;
    qqUrl: string;
};

class Login extends AComponent<tProps, tState> {
    constructor(props: tProps) {
        super(props);
        this.state = {
            wxUrl: '',
            qqUrl: ''
        };
    }
    public render() {
        const { classes = {} } = this.props;
        const { wxUrl, qqUrl } = this.state;
        return (
            <div className={classes.login}>
                <Tabs type='card'>
                    <TabPane tab='QQ' key='1'>
                        <iframe src={qqUrl} />
                    </TabPane>
                    <TabPane tab='微信' key='2'>
                        <iframe src={wxUrl} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default jss(Login);
