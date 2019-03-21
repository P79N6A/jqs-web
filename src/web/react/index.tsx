/**
 * Created by garrettzhou@2018-8-13
 * react 入口
 */
import bowser from 'bowser';
import { hRedux, hReport, hWeb } from 'my-local-web-helper';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Root from './page/Root';

export default () => {
    if (bowser.chrome || bowser.safari) {
        hWeb.init();
        try {
            render(
                <Provider store={hRedux.Store}>
                    <Root />
                </Provider>,
                document.getElementById('react-container')
            );
        } catch (error) {
            hReport.webTopError({
                key: 'web_entry',
                msg: 'web init error',
                error
            });
        }
    } else {
        alert(`您的浏览器内核为：${bowser.name + bowser.version}。请使用以chrome或safari为内核的浏览器访问该网站！其它内核的兼容版正在开发，敬请期待！`);
    }
};
