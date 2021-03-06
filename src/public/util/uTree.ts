/**
 * Created by garrettzhou@2018-8-3
 * tree工具
 */
import uObject from './uObject';

namespace _uTree {
    export const create = <TBase extends dData.Tree.Base, TId extends dData.Tree.Id>(list: TBase[], pid?: TId | null) =>
        list.filter(value => (pid == null && value.pid == null) || pid === value.pid).map(value => {
            const item = { ...value as object } as TBase & { children?: TBase[] };
            const children = create(list, value.id);
            if (children.length) {
                item.children = children;
            }
            return item;
        });

    type FlattenOption<TKeepChildren extends boolean | undefined> = { keepChildren?: TKeepChildren };
    const _flatten = <TBase extends dData.Tree.Base, TKeepChildren extends boolean | undefined>
        (list: dData.Tree.Item<TBase>[], result: (TKeepChildren extends true ? dData.Tree.Item<TBase> : TBase)[], opt: FlattenOption<TKeepChildren> = {}) => {
        const { keepChildren } = opt;

        list.forEach(item => {
            let newItem: any = {
                ...(item as object)
            };

            newItem = keepChildren ? newItem : uObject.deleteKey(newItem, 'children');

            result.push(newItem);
            if (item.children && item.children.length) {
                _flatten(item.children, result, opt);
            }
        });
        return result;
    };
    export const flatten = <TBase extends dData.Tree.Base, TKeepChildren extends boolean | undefined = undefined>
        (list: dData.Tree.Item<TBase>[], opt: FlattenOption<TKeepChildren> = {}) => _flatten(list, [], opt);

    const _getPath = <TBase extends dData.Tree.Base, TId extends dData.Tree.Id>(id: TId, treeList: TBase[], result: TBase[]) => {
        const item = treeList.find(one => one.id === id);
        if (item) {
            result.push(item);
            if (item.pid) _getPath(item.pid, treeList, result);
        }
        return result;
    };
    export const getPath = <TBase extends dData.Tree.Base, TId extends dData.Tree.Id>(id: TId, treeList: dData.Tree.Item<TBase>[]) => _getPath(id, flatten(treeList), []);
}

export const uTree: dp.DeepReadonly<typeof _uTree> = _uTree;
export default uTree;
