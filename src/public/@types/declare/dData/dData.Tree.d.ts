/**
 * Created by garrettzhou@2018-8-3
 * 数据结构类型 Tree
 */
declare namespace dData {
    namespace Tree {
        type Id = string | number;
        type Base = { id: Id; pid?: Id | null };
        type Item<T extends Base> = T & { children?: Item<T>[] };
    }
}
