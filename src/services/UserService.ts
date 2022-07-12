import api from '@/helpers/http/api'
import {User} from '@/interfaces/user'

class UserService {

    async getProfile(): Promise<User> {
        const res = await api.get('/profile/')
        return <User>res.data
    }

    async updateProfile(payload: User): Promise<User> {
        const res = await api.put('/profile/', payload)
        return <User>res.data
    }

}

export default new UserService()
