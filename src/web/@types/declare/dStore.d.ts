/**
 * Created by garrettzhou@2018-9-1
 * store 常用类型
 */
declare namespace dStore {
    type State = {
        user: User;
        root: Root;
    };

    type User = {
        nowUser: NowUser;
    };
    type Root = {
        spinning: boolean;
    };

    type NowUser = any;
}
