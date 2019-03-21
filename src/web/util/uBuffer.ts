/**
 * Created by garrettzhou@2018-8-3
 * buffer 工具
 */
import { uObject } from 'my-local-web-util';
namespace _uBuffer {
    export const toBase64 = (buffer: ArrayBuffer | Uint8Array) => {
        let binary = '';
        const bytes = uObject.checkInstance(buffer, ArrayBuffer) ? new Uint8Array(buffer) : buffer;

        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
}

export const uBuffer: dp.DeepReadonly<typeof _uBuffer> = _uBuffer;
export default uBuffer;
