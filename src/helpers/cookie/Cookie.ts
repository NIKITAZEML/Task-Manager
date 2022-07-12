export default class Cookie {

    static set(key, value, options): void {
        if (options.expires) {
            const {expires} = options
            document.cookie = `${key}=${value}; expires=${expires}`
            return
        }
        document.cookie = `${key}=${value}`
    }

    static get(key): string | boolean {
        const regExp = new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`)
        const val = document.cookie.replace(regExp, '$1')
        if (val) return val
        return false
    }

    static remove(key): void {
        document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    }

    static removeAll(): void {
        const cookies = document.cookie.split(';')
        cookies.forEach(cookie => {
            const pos = cookie.indexOf('=')
            const key = pos > -1 ? cookie.substr(0, pos) : cookie
            document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`
            document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
        })
    }

}
