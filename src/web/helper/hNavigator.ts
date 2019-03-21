/**
 * Created by garrettzhou@2018-9-3
 * navigator helper
 */
import { createHashHistory } from 'history';
import { uObject, uString } from 'my-local-web-util';

class HNavigator {
    public static readonly instance: HNavigator = new HNavigator();
    private constructor() { }

    private readonly navigator = createHashHistory();
    private readonly HOME_PATH = '/home';
    private readonly LOGIN_PATH = '/login';

    private readonly checkPathChange = (route: RouterHistory.LocationDescriptor) => {
        const path = (uObject.check(route) ? route.pathname : route) || '';
        if (uString.equalIgnoreCase(path, location.hash.slice(1))) {
            return false;
        }
        return true;
    }

    public readonly push = (route: RouterHistory.LocationDescriptor) => {
        this.checkPathChange(route) && this.navigator.push(uObject.check(route) ? route : { pathname: route });
    }

    public readonly replace = (route: RouterHistory.LocationDescriptor) => {
        this.checkPathChange(route) && this.navigator.replace(uObject.check(route) ? route : { pathname: route });
    }

    public readonly back = () => {
        this.navigator.goBack();
    }

    public readonly goHome = (isReplace = true) => {
        if (isReplace) {
            this.replace(this.HOME_PATH);
        } else {
            this.push(this.HOME_PATH);
        }
    }

    public readonly resetToHome = () => {
        hNavigator.goHome();
        hNavigator.reload(true);
    }

    public readonly goLogin = (isReplace = true) => {
        if (isReplace) {
            this.replace(this.LOGIN_PATH);
        } else {
            this.push(this.LOGIN_PATH);
        }
    }

    public readonly reload = (forcedReload = false) => {
        window.location.reload(forcedReload);
    }

    public readonly openUrl = (url: string, target: '_top' | '_blank' | '_self' | '_parent' = '_top') => {
        window.open(url, target);
    }
}

export const hNavigator = HNavigator.instance;
export default hNavigator;
