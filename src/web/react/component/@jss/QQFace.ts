/**
 * Created by pingji@2019-1-9
 * qqFace组件jss
 */
import injectSheet from 'react-jss';

export default injectSheet({
    qqFace: {
        overflow: 'auto',
        position: 'relative',
        height: '310px',
        '& .qq-face-wrap': {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
            background: 'url("http://res.imtt.qq.com/tagapp/img/qqface.png") no-repeat',
            backgroundSize: 'cover',
            height: '400px',
            width: '310px',
            paddingTop: '3px',
            paddingLeft: '5px',
            '& li': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                width: '33px',
                height: '33px'
            }
        },
        '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
            borderRadius: '6px'
        },
        '&:hover': {
            '&::-webkit-scrollbar-thumb': {
                background: '#C1C1C1'
            }
        }
    }
});
