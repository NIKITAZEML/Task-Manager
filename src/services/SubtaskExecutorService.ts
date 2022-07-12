import api from '@/helpers/http/api'

class SubtaskExecutorService {

    async delete(id: number, executorId: number): Promise<any> {
        const res = await api.post(`/checkpoint/${id}/delete-executor/`, {id: executorId})
        return res.data
    }

}

export default new SubtaskExecutorService()
