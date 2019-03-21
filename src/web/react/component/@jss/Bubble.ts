/**
 * Created by pingji@2019-1-8
 * Bubble组件jss
 */
import injectSheet from 'react-jss';

export default injectSheet({
    bubble: {
        boxSizing: 'border-box',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        position: 'fixed',
        textAlign: 'center',
        zIndex: 1000,
        background: 'white',
        padding: '25px',
        boxShadow: '1px 1px 8px 0px #e3e3e3',
        '&.bottom': {
            '&:after': {
                position: 'absolute',
                content: '""',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderBottom: '8px solid white',
                borderTop: '8px solid transparent',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent'
            },
            '&:before': {
                position: 'absolute',
                content: '""',
                left: '50%',
                top: '-18px',
                transform: 'translateX(-50%)',
                borderBottom: '9px solid #e5e5e5',
                borderTop: '9px solid transparent',
                borderLeft: '9px solid transparent',
                borderRight: '9px solid transparent'
            }
        }
    },
    bubbleTitle: {
        color: '#242424',
        fontSize: '16px'
    }
});
