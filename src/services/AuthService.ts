import {Entity} from '@/interfaces/user'
import api from '@/helpers/http/api'
import Cookie from '@/helpers/cookie/Cookie'

class AuthService {

    async signup(payload: Entity): Promise<Entity> {
        const res = await api.post('/register/', payload, {headers: {Authorization: ''}})
        const {token, user} = res.data
        return <Entity>{...user, token}
    }

    async login(payload: Entity): Promise<Entity> {
        const res = await api.post('/signin/', payload, {headers: {Authorization: ''}})
        const {token, user, expires_in} = res.data
        const timestamp: number = Date.now() + Math.floor(expires_in * 1000)
        const lifetime: string = new Date(timestamp).toUTCString()
        Cookie.set('token', token, {expires: lifetime})
        return <Entity>{...user, token}
    }

    logout(): void {
        Cookie.removeAll()
        location.replace('/')
    }

    async refreshPassword(payload): Promise<any> {
        const res = await api.post('/password-refresh/', payload)
        return <any>res.data
    }

}

export default new AuthService()
