/**
 * Created by garrettzhou@2018-8-3
 * 加密工具
 */
import crypto from 'crypto';

namespace _uCrypto {
    export const hash = (data: Data, algorithm: string) => crypto.createHash(algorithm).update(data as Buffer | string).digest('hex');
}

//#region 私有类型
type Data = string | Buffer | Uint8Array;
//#endregion

export const uCrypto: dp.DeepReadonly<typeof _uCrypto> = _uCrypto;
export default uCrypto;
