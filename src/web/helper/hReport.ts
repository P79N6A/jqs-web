/**
 * Created by garrettzhou@2018-9-3
 * report helper
 */
/* import { hRequest } from 'my-local-web-helper';
import { uObject } from 'my-local-web-util'; */
class HReport {
    public static readonly instance: HReport = new HReport();
    private constructor() { }

    public readonly log = (opt: dReport.LogOptions) => {
        if (process.env.IS_LOCAL_TEST) {
            console.log(opt);
            return;
        }
        try {
            /* const { details, error, source } = opt;
            hRequest.api.report.log(uObject.getSafeJsonObj({
                ...opt,
                details: details && {
                    name: details.name,
                    message: details.message,
                    stack: details.stack,
                    ...details
                },
                error: error && {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    ...error
                },
                source: source && {
                    name: source.name,
                    message: source.message,
                    stack: source.stack,
                    ...source
                }
            }), { noHandle: true, noReport: true }); */
        } catch (error) {
            console.error(error);
        }
    }

    public readonly webLog = (opt: dp.ExculdePick<dReport.LogOptions, 'fileName'>) =>
        this.log({ ...opt, fileName: 'webLog' })

    public readonly webError = (opt: dp.ExculdePick<dReport.LogOptions, 'fileName'>) =>
        this.log({ ...opt, fileName: 'webError' })

    public readonly webReactError = (opt: dp.ExculdePick<dReport.LogOptions, 'fileName' | 'always' | 'attribute'>) =>
        this.log({ ...opt, fileName: 'webReactError', always: true, attribute: true })

    public readonly webTopError = (opt: dp.ExculdePick<dReport.LogOptions, 'fileName' | 'always' | 'attribute'>) =>
        this.log({ ...opt, fileName: 'webTopError', always: true, attribute: true })
}

export const hReport = HReport.instance;
export default hReport;
