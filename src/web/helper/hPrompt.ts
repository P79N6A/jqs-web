/**
 * Created by garrettzhou@2018-8-20
 * prompt helper
 */
import { Modal, message } from 'antd';
import { uString } from 'my-local-web-util';

class HPrompt {
    public static readonly instance: HPrompt = new HPrompt();
    private constructor() {
        message.config({
            maxCount: 5
        });
    }

    public readonly createModal = (options: ModalOptions, styleType?: ePrompt.StyleType) =>
        new Promise<boolean>(resolve => {
            const params: Antd.ModalFuncProps = uString.check(options) ? { content: options } : options;
            params.onCancel = () => resolve(false);
            params.onOk = () => resolve(true);

            switch (styleType) {
                case ePrompt.StyleType.Info:
                    Modal.info(params);
                    break;
                case ePrompt.StyleType.Error:
                    Modal.error(params);
                    break;
                case ePrompt.StyleType.Success:
                    Modal.success(params);
                    break;
                case ePrompt.StyleType.Warning:
                    Modal.warning(params);
                    break;
                case ePrompt.StyleType.Confirm:
                    Modal.confirm(params);
                    break;
                default:
                    Modal.info(params);
            }
        })

    public readonly createMessage = (options: MessageOptions, styleType?: ePrompt.StyleType) =>
        new Promise<null>(resolve => {
            const opt = uString.check(options) ? { content: options } : options;

            const params: [React.ReactNode, number | undefined, dp.Func] = [opt.content, opt.duration, () => { resolve(null); }];
            switch (styleType) {
                case ePrompt.StyleType.Info:
                    message.info(...params);
                    break;
                case ePrompt.StyleType.Error:
                    message.error(...params);
                    break;
                case ePrompt.StyleType.Success:
                    message.success(...params);
                    break;
                case ePrompt.StyleType.Warning:
                    message.warning(...params);
                    break;
                default:
                    message.info(...params);
            }
        })

    public readonly warningModal = (options: ModalOptions) => this.createModal(options, ePrompt.StyleType.Warning);

    public readonly successModal = (options: ModalOptions) => this.createModal(options, ePrompt.StyleType.Success);

    public readonly infoModal = (options: ModalOptions) => this.createModal(options, ePrompt.StyleType.Info);

    public readonly errorModal = (options: ModalOptions) => this.createModal(options, ePrompt.StyleType.Error);

    public readonly confirmModal = (options: ModalOptions) => this.createModal(options, ePrompt.StyleType.Confirm);

    public readonly warningMessage = (content: MessageOptions) => this.createMessage(content, ePrompt.StyleType.Warning);

    public readonly successMessage = (content: MessageOptions) => this.createMessage(content, ePrompt.StyleType.Success);

    public readonly infoMessage = (content: MessageOptions) => this.createMessage(content, ePrompt.StyleType.Info);

    public readonly errorMessage = (content: MessageOptions) => this.createMessage(content, ePrompt.StyleType.Error);
}

//#region 私有类型
type ModalOptions = string | dp.ExculdePick<Antd.ModalFuncProps, 'onOk' | 'onCancel'>;
type MessageOptions = string | {
    content: React.ReactNode | string;
    duration?: number;
};
//#endregion

export const hPrompt = HPrompt.instance;
export default hPrompt;
