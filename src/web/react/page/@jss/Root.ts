/**
 * Created by garrettzhou@2018-9-29
 * Root组件jss
 */
import { hStyle } from 'my-local-web-helper';
import injectSheet from 'react-jss';

export default injectSheet({
    '@global': {
        'html,body,#react-container': {
            ...hStyle.baseClasses.container,
            ...hStyle.baseClasses.wordBread
        },
        '#react-container,.ant-modal-content': {
            '& .ant-spin-nested-loading,& .ant-spin-container': {
                ...hStyle.baseClasses.container
            },

            '& .ant-layout': {
                height: '100%',
                overflow: 'hidden'
            },
            '& .ant-layout-content': {
                borderColor: 'rgb(240, 242, 245)',
                borderWidth: '10px 10px 0 10px',
                borderStyle: 'solid',
                backgroundColor: 'white',
                overflow: 'auto'
            },

            '& .ant-row': {
                margin: '15px 0 15px 0',
                '& > div': {
                    padding: '0 10px 0 10px'
                }
            },

            '& .ant-table-thead': {
                '& th': {
                    textAlign: 'center'
                }
            },
            '& .ant-table-tbody': {
                textAlign: 'center',
                '& td': {
                    ...hStyle.baseClasses.wordBread
                }
            },

            '& .ant-tag': {
                cursor: 'default'
            },

            '& .ant-select-tree-dropdown': {
                maxHeight: '400px',
                overflow: 'auto'
            },

            '& .ant-select': {
                minWidth: '160px'
            },

            '& .ant-back-top': {
                bottom: '110px'
            },

            '& .ant-layout-sider-children': {
                overflowY: 'auto'
            }
        }
    },
    root: {
        ...hStyle.baseClasses.container
    },
    devButton: {
        position: 'fixed',
        top: '100px',
        right: '30px',
        zIndex: 10000
    },
    searchTool: {
        '& .ant-row': {
            '& > div:nth-child(odd)': {
                textAlign: 'right'
            },
            '& .ant-select': {
                width: '100%'
            },
            '& .ant-calendar-picker': {
                width: '100%'
            },
            '& .ant-input': {
                width: '100%'
            }
        }
    },
    modalDefault: {
        minWidth: '900px',
        minHeight: '500px'
    },
    gridDefault: {
        '& .ant-row': {
            '& > :first-child': {
                fontWeight: 'bold',
                textAlign: 'right'
            },

            '& > :last-child': {
                paddingLeft: '20px',
                textAlign: 'left',
                color: 'rgba(0,0,0,.45)'
            }
        }
    },
    inputDefault: {
        width: '120px !important'
    },
    inputSmall: {
        width: '80px'
    },
    inputBig: {
        width: '180px'
    },
    inputDouble: {
        width: '240px'
    },
    textAreaDefault: {
        minHeight: '200px !important'
    },
    tableFilter: {
        padding: '8px',
        borderRadius: '6px',
        background: '#fff',
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.2)',
        '& .antd-input': {
            width: '130px',
            marginRight: '8px'
        }
    },
    floatRight: {
        float: 'right'
    },
    clearFloat: {
        '&:after': {
            content: '" "',
            display: 'block',
            height: 0,
            clear: 'both',
            visibility: 'hidden'
        }
    },
    pointer: {
        cursor: 'pointer'
    },
    fontBlod: {
        fontWeight: 'bold'
    },
    fontRed: {
        color: 'red'
    },
    fontBlue: {
        color: '#108ee9'
    },
    fontLink: {
        color: '#1890ff'
    },
    fontText: {
        color: 'rgba(0,0,0,.45)'
    },
    textCenter: {
        textAlign: 'center'
    },
    postImgDefault: {
        minWidth: '30px',
        width: '100%',
        maxWidth: '120px'
    },
    elementCenter: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    spinning: {
        position: 'fixed',
        zIndex: 1001,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        '& span': {
            marginTop: '150px'
        }
    }
});
