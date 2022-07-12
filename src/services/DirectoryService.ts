import api from '@/helpers/http/api'

class DirectoryService {

    async get(): Promise<any> {
        const res = await api.get('/directory/sections/')
        return res.data
    }

}

export default new DirectoryService()
