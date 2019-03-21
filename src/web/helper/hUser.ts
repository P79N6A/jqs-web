/**
 * Created by garrettzhou@2018-8-20
 * user helper
 */
import { hError, hRedux } from 'my-local-web-helper';

class HUser {
    public static readonly instance: HUser = new HUser();
    private constructor() { }

    public readonly getNowOrNull = () => hRedux.State.user.nowUser;

    public readonly getNow = () => {
        if (hRedux.State.user.nowUser) return hRedux.State.user.nowUser;
        throw new hError.Common({
            msg: '请登录！',
            showPrompt: ePrompt.Type.Modal,
            onEnd: () => {
                hUser.logout();
            }
        });
    }

    public readonly clearNow = () => {
        hRedux.dispatch(hRedux.action.userClear());
    }

    public readonly logout = async () => {

    }
}

export const hUser = HUser.instance;
export default hUser;
