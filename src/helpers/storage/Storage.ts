export default class Storage {

    public static set(key: string, value: any) {
        localStorage.setItem(key, value)
    }

    public static get(key: string): string {
        return localStorage.getItem(key)
    }

    public static remove(key: string): void {
        localStorage.removeItem(key)
    }

    public static isKey(key: string): boolean {
        return !!localStorage.getItem(key)
    }

    public static setJson(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    public static getJson(key: string): any {
        return JSON.parse(localStorage.getItem(key))
    }

}
