/**
 * Created by garrettzhou@2018-8-3
 * html工具
 */
import htmlCode from 'html-entities';

namespace _uHtml {
    export const checkTextNode = (node: Node | null) => !!node && node.nodeName === '#text';

    export const checkLinkNode = (node: Node | null) => !!node && node.nodeName === 'A';

    export const checkBrNode = (node: Node | null) => !!node && node.nodeName === 'BR';

    export const clearHtml = (html: string) => html.replace(/<\/?[^>]*>/g, '');

    export const encode = (html: string) => new htmlCode.AllHtmlEntities().encode(html);

    export const decode = (str: string) => new htmlCode.AllHtmlEntities().decode(str);
}

export const uHtml: dp.DeepReadonly<typeof _uHtml> = _uHtml;
export default uHtml;
