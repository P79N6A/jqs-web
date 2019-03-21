/**
 * Created by garrettzhou@2018-8-20
 * style helper
 */
class HStyle {
    public static readonly instance: HStyle = new HStyle();
    private constructor() { }

    public readonly baseClasses: ReactJss.Styles<'container' | 'wordBread'> = {
        container: {
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        },
        wordBread: {
            wordBreak: 'break-word',
            wordWrap: 'break-word'
        }
    };

    public readonly joinClasses = (...classes: dp.AllowNon<string>[]) => classes.filter(item => !!item).join(' ');
}

export const hStyle = HStyle.instance;
export default hStyle;
