/**
 * Created by garrettzhou@2018-8-3
 * array工具
 */
namespace _uArray {
    export const check = <T extends any[]= any[]>(obj: unknown): obj is T => obj instanceof Array;

    export const updateItemAndGetNew = <TItem extends object>(list: TItem[], index: number, value: Partial<TItem>) => {
        const newList = list.slice();

        if (!newList[index]) return newList;

        newList[index] = {
            ...(newList[index] as any),
            ...(value as any)
        };
        return newList;
    };

    export const deleteAndGetNew = <TItem extends object>(list: TItem[], index: number, length = 1) => {
        const newList = list.slice();
        newList.splice(index, length);
        return newList;
    };

    export const addAndGetNew = <TItem extends object>(list: TItem[], item: TItem) => {
        const newList = list.slice();
        newList.push(item);
        return newList;
    };
}

export const uArray: dp.DeepReadonly<typeof _uArray> = _uArray;
export default uArray;
