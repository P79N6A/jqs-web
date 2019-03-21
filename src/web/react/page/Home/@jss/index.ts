/**
 * Created by garrettzhou@2018-9-29
 * Home组件jss
 */
import injectSheet from 'react-jss';

export default injectSheet({
    home: {
        minHeight: '100vh',
        '& .logo': {
            margin: '16px auto 16px auto',
            textAlign: 'center',
            '& .big': {
                width: 128,
                height: 43
            },
            '& .small': {
                height: 43,
                widows: 43
            }
        },
        '& .ant-layout-header': {
            background: '#fff',
            padding: 16
        },
        '& .ant-breadcrumb': {
            position: 'relative',
            top: 5
        },
        '& .ant-layout-footer': {
            textAlign: 'center',
            padding: '10px'
        },
        '& .header-right': {
            position: 'absolute',
            right: 10,
            top: 0
        }
    }
});
