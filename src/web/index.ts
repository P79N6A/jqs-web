/**
 * Created by garrettzhou@2018-8-13
 * web 入口
 */
import hack from './hack';

if (top !== self) {
    window.open(location.href, '_top');
} else {
    (async function () {
        await hack();
        (await import('./react')).default();
    })();
}
