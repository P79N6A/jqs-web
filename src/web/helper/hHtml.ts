/**
 * Created by pingji@2019-1-9
 * hHtml helper
 */
class HHtml {
    public static readonly instance: HHtml = new HHtml();
    private constructor() { }

    public readonly getTextWidth = (text: string, opt?: {
        parent?: Element;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
    }) => {
        const pre = document.createElement('pre');
        pre.style.opacity = '0';
        pre.style.position = 'absolute';
        pre.style.fontFamily = opt && opt.fontFamily || null;
        pre.style.fontSize = opt && opt.fontSize || null;
        pre.style.fontWeight = opt && opt.fontWeight || null;
        pre.innerText = text;

        if (opt && opt.parent) {
            opt.parent.appendChild(pre);
        } else {
            document.body.appendChild(pre);
        }

        const width = pre.clientWidth;
        pre.remove();
        return width;
    }
}

export const hHtml = HHtml.instance;
export default hHtml;
