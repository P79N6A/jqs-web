/**
 * Created by garrettzhou@2018-8-20
 * task helper
 */

class HTask {
    public static readonly instance: HTask = new HTask();
    private constructor() { }

    private readonly timedTaskLastTime: { [K: string]: number } = {};

    public timedTask = (id: symbol, task: Function, timeout = 60000) => {
        const lastTime = this.timedTaskLastTime[id as any];
        const now = Date.now();
        if (!lastTime || now - lastTime > timeout) {
            task();
            this.timedTaskLastTime[id as any] = now;
        }
    }

    public debounce = (fn: () => void, delay: number) => {
        let timer: any;
        return () => {
            timer && clearTimeout(timer);
            timer = setTimeout(fn, delay);
        };
    }
}

export const hTask = HTask.instance;
export default hTask;
