/**
 *
 * sortable array with different types by ABC
 *
 * @param arr
 * @param key
 */
export function sortByABC<T>(arr: Array<T>, key: string): Array<T> {
    return arr.filter(el => el[key])
        .sort((a: T, b: T) => (a[key] > b[key] ? 1 : -1))
}

/**
 *
 * @param obj
 */
export function isString<T>(obj: T): boolean {
    return Object.prototype.toString.call(obj) === '[object String]'
}
