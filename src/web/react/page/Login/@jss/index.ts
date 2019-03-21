/**
 * Created by garrettzhou@2018-9-29
 * Login组件jss
 */
import injectSheet from 'react-jss';

export default injectSheet({
    login: {
        width: '100%',
        height: '100%',

        '& .ant-tabs': {
            marginTop: 100,
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
            '& .ant-tabs-bar': {
                margin: 0
            },

            '& .ant-tabs-content': {
                width: '100%',
                height: 600,
                '& .ant-tabs-tabpane': {
                    width: '100%',
                    height: '100%'
                }
            }
        },

        '& iframe': {
            width: '100%',
            height: '100%',
            overflow: 'auto',
            border: '1px solid #e8e8e8',
            borderTop: 0
        }
    }
});
