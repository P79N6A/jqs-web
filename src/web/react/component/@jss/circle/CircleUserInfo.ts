/**
 * Created by garrettzhou@2018-11-5
 * CircleUserInfo组件jss
 */
import injectSheet from 'react-jss';

export default injectSheet({
    circleUserInfo: {
        '& .userIcon': {
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            position: 'absolute',
            left: 0,
            top: 0
        },
        '& .userName': {
            color: '#8f8f8f',
            lineHeight: '25px',
            display: 'inline-block',
            height: '25px',
            position: 'relative',
            paddingLeft: '25px',
            width: 'auto',
            minWidth: '50px',
            textAlign: 'center'
        }
    }
});
