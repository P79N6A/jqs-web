/**
 * Created by garrettzhou@2018-8-20
 * web helper
 */
import moment from 'moment';
import { hRedux, hReport } from 'my-local-web-helper';
import { uObject, uStorage, uString } from 'my-local-web-util';

class HWeb {
    public static readonly instance: HWeb = new HWeb();
    private constructor() { }

    private readonly LAST_STATE_KEY = uString.createKey('web_lastState');

    private readonly clearState = () => {
        uStorage.remove(this.LAST_STATE_KEY);
        hRedux.dispatch(hRedux.action.reset());
    }

    private readonly checkRefreshState = (lastUnloadTime: number, minHour = 240) => {
        const lastUnloadDate = moment(new Date(lastUnloadTime));
        const nowDate = moment(new Date());

        if (nowDate.add(-minHour, 'h').isAfter(lastUnloadDate)) return true;
        return false;
    }

    public readonly reset = () => {
        this.clearState();
    }
    public readonly init = () => {
        window.onunload = () => {
            uStorage.setValue(this.LAST_STATE_KEY,
                JSON.stringify(
                    {
                        lastUnloadTime: Date.now(),
                        state: hRedux.State
                    }
                )
            );
        };
        const lastUnLoadInfoStr = uStorage.getValue(this.LAST_STATE_KEY);
        try {
            if (lastUnLoadInfoStr) {
                const lastUnLoadInfo = uObject.jsonParse<{
                    state: dStore.State;
                    lastUnloadTime: number;
                }>(lastUnLoadInfoStr);
                if (lastUnLoadInfo && lastUnLoadInfo.lastUnloadTime && lastUnLoadInfo.state && !this.checkRefreshState(lastUnLoadInfo.lastUnloadTime, 0)) {
                    lastUnLoadInfo.state.root.spinning = false;
                    hRedux.dispatch(hRedux.action.recover(lastUnLoadInfo.state));
                }
            }
        } catch (error) {
            hReport.webTopError({
                key: 'hWeb_init_recover',
                msg: 'init redux state error',
                error
            });
        }
    }
}

export const hWeb = HWeb.instance;
export default hWeb;
